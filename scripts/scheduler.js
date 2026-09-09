const fs = require('fs');
const path = require('path');

// Node's recursive rm retries only on EBUSY / EMFILE / ENFILE / ENOTEMPTY / EPERM,
// and only when maxRetries > 0 (the default is 0 — i.e. fail on first collision).
const RM_OPTIONS = { recursive: true, force: true, maxRetries: 5, retryDelay: 250 };

// Trash dirs live next to .next/cache (same filesystem => rename is atomic).
const TRASH_PREFIX = '.cache-trash-';

// Races against the live server writing into the cache are expected, not failures.
const RACE_CODES = new Set(['ENOTEMPTY', 'EBUSY', 'ENOENT', 'EEXIST']);

const MB = 1024 * 1024;

// Disk budget for .next/cache. The Next 12 image optimizer only evicts an entry
// when that exact image is requested again after its TTL, so on a site serving
// user-uploaded images the cache is effectively unbounded — a budget is the only
// thing that actually caps it.
const MAX_BYTES = (Number(process.env.CACHE_MAX_MB) || 2048) * MB;

// Prune down to this fraction of the budget so we don't re-prune every tick.
const PRUNE_TARGET_RATIO = 0.7;

// Entries untouched for this long are dropped even when we're under budget.
const MAX_AGE_MS = (Number(process.env.CACHE_MAX_AGE_DAYS) || 7) * 24 * 60 * 60 * 1000;

// Build-time caches that are worthless in a running standalone server. If one of
// these ever ends up in a release bundle it is pure dead weight.
const BUILD_CACHE_DIRS = new Set([
    'webpack',
    'swc',
    'next-babel-loader',
    'next-minifier',
    'eslint',
]);

function formatMB(bytes) {
    return `${(bytes / MB).toFixed(1)} MB`;
}

function resolveCacheDir() {
    const possiblePaths = [
        // Runtime cwd must win. PM2 starts server.js with cwd = release dir,
        // so this resolves to <release>/.next/cache in deployed builds.
        path.join(process.cwd(), '.next', 'cache'),
        path.resolve('.next/cache'),

        // Standalone runtime before prepare-deploy:
        // .next/standalone/scripts -> .next/cache
        path.resolve(__dirname, '../../cache'),

        // Prepared deploy runtime (deploy/scripts -> deploy/.next/cache) and
        // source script runtime (scripts -> .next/cache) resolve identically.
        path.resolve(__dirname, '../.next/cache'),
    ];

    const uniquePaths = [
        ...new Set(possiblePaths.map((cachePath) => path.resolve(cachePath))),
    ];

    const found =
        uniquePaths.find((cachePath) => fs.existsSync(cachePath)) ||
        path.join(process.cwd(), '.next', 'cache');

    // The deploy points <release>/.next/cache at a release-independent shared
    // directory, so every path below must act on the real dir — otherwise a
    // rename would move the symlink and orphan gigabytes behind it.
    try {
        return fs.realpathSync(found);
    } catch (err) {
        return found;
    }
}

/**
 * Recursive size + last-touched time of a directory tree, as one unit.
 * Unreadable children are skipped rather than failing the whole sweep.
 */
async function measure(target) {
    let stat;
    try {
        stat = await fs.promises.lstat(target);
    } catch (err) {
        return { bytes: 0, mtimeMs: 0 };
    }

    if (!stat.isDirectory()) {
        return { bytes: stat.size, mtimeMs: stat.mtimeMs };
    }

    let entries;
    try {
        entries = await fs.promises.readdir(target);
    } catch (err) {
        return { bytes: 0, mtimeMs: stat.mtimeMs };
    }

    let bytes = 0;
    let mtimeMs = stat.mtimeMs;

    for (const entry of entries) {
        const child = await measure(path.join(target, entry));
        bytes += child.bytes;
        if (child.mtimeMs > mtimeMs) mtimeMs = child.mtimeMs;
    }

    return { bytes, mtimeMs };
}

async function removeQuietly(target) {
    try {
        await fs.promises.rm(target, RM_OPTIONS);
        return true;
    } catch (err) {
        if (RACE_CODES.has(err.code)) return false;
        throw err;
    }
}

/**
 * Collect the prunable units under .next/cache. Each image-cache entry is one
 * <hash> directory holding every variant of a single source image, so that
 * directory — not the individual file — is the unit we evict.
 */
async function collectUnits(cacheDir) {
    const units = [];

    let topLevel;
    try {
        topLevel = await fs.promises.readdir(cacheDir, { withFileTypes: true });
    } catch (err) {
        return units;
    }

    for (const entry of topLevel) {
        const full = path.join(cacheDir, entry.name);

        if (entry.isDirectory() && entry.name === 'images') {
            let hashes;
            try {
                hashes = await fs.promises.readdir(full);
            } catch (err) {
                continue;
            }
            for (const hash of hashes) {
                const target = path.join(full, hash);
                const { bytes, mtimeMs } = await measure(target);
                units.push({ target, bytes, mtimeMs, kind: 'image' });
            }
            continue;
        }

        const { bytes, mtimeMs } = await measure(full);
        units.push({
            target: full,
            bytes,
            mtimeMs,
            kind: BUILD_CACHE_DIRS.has(entry.name) ? 'build' : 'other',
        });
    }

    return units;
}

let inFlight = null;

/**
 * Keep .next/cache under its disk budget by evicting least-recently-used
 * entries, instead of periodically nuking the whole thing (which stalls every
 * image request afterwards while the optimizer re-encodes from scratch).
 */
async function pruneCache(options = {}) {
    if (inFlight) {
        console.log('⏳ Cache maintenance already in progress — skipping this run');
        return inFlight;
    }

    inFlight = runPruneCache(options).finally(() => {
        inFlight = null;
    });

    return inFlight;
}

async function runPruneCache({ maxBytes = MAX_BYTES, maxAgeMs = MAX_AGE_MS } = {}) {
    const cacheDir = resolveCacheDir();

    await sweepOldTrash(path.dirname(cacheDir));

    if (!fs.existsSync(cacheDir)) {
        console.log(`ℹ️  Cache directory not found at: ${cacheDir} (nothing to prune)`);
        return { totalBytes: 0, freedBytes: 0, removed: 0 };
    }

    const units = await collectUnits(cacheDir);
    const totalBytes = units.reduce((sum, unit) => sum + unit.bytes, 0);
    const now = Date.now();

    console.log(
        `📊 Cache at ${cacheDir}: ${formatMB(totalBytes)} across ${units.length} entrie(s), budget ${formatMB(maxBytes)}`
    );

    // Oldest first — build caches always go first, they are dead weight at runtime.
    units.sort((a, b) => {
        if (a.kind === 'build' && b.kind !== 'build') return -1;
        if (b.kind === 'build' && a.kind !== 'build') return 1;
        return a.mtimeMs - b.mtimeMs;
    });

    const lowWater = maxBytes * PRUNE_TARGET_RATIO;
    let remaining = totalBytes;
    let freedBytes = 0;
    let removed = 0;
    let skipped = 0;

    // Only start evicting live entries once we are actually over budget, then
    // keep going past the budget down to the low-water mark so the next run
    // isn't pruning again immediately.
    let evictingForSize = totalBytes > maxBytes;

    for (const unit of units) {
        if (evictingForSize && remaining <= lowWater) evictingForSize = false;

        const expired = maxAgeMs > 0 && now - unit.mtimeMs > maxAgeMs;
        const isDeadWeight = unit.kind === 'build';

        if (!evictingForSize && !expired && !isDeadWeight) continue;

        if (await removeQuietly(unit.target)) {
            remaining -= unit.bytes;
            freedBytes += unit.bytes;
            removed += 1;
        } else {
            skipped += 1;
        }
    }

    if (removed === 0) {
        console.log('✅ Cache within budget — nothing to prune');
    } else {
        console.log(
            `✅ Pruned ${removed} entrie(s), freed ${formatMB(freedBytes)} — now ~${formatMB(remaining)}`
        );
    }
    if (skipped > 0) {
        console.warn(`⚠️  ${skipped} entrie(s) skipped (in use) — next run retries them`);
    }

    return { totalBytes, freedBytes, removed };
}

/**
 * Delete leftover trash dirs from earlier runs that were interrupted
 * (process restart / deploy mid-clean).
 */
async function sweepOldTrash(parentDir) {
    let entries;
    try {
        entries = await fs.promises.readdir(parentDir, { withFileTypes: true });
    } catch (err) {
        return; // parent gone — nothing to sweep
    }

    const stale = entries
        .filter((entry) => entry.isDirectory() && entry.name.startsWith(TRASH_PREFIX))
        .map((entry) => path.join(parentDir, entry.name));

    for (const dir of stale) {
        try {
            await fs.promises.rm(dir, RM_OPTIONS);
            console.log(`🧹 Removed stale trash dir: ${dir}`);
        } catch (err) {
            console.warn(`⚠️  Could not remove stale trash dir ${dir}: ${err.message}`);
        }
    }
}

/**
 * In-place fallback for when rename is unavailable (e.g. .next/cache is a mount
 * point => EXDEV/EBUSY). Removes children one by one and keeps the root, so the
 * live server always has a directory to write into. Returns the race errors it
 * survived; hard errors (EACCES, ENOSPC, ...) are thrown.
 */
async function clearInPlace(cacheDir) {
    const entries = await fs.promises.readdir(cacheDir);
    const raced = [];

    for (const entry of entries) {
        try {
            await fs.promises.rm(path.join(cacheDir, entry), RM_OPTIONS);
        } catch (err) {
            if (RACE_CODES.has(err.code)) {
                raced.push(`${entry} (${err.code})`);
                continue;
            }
            throw err;
        }
    }

    return raced;
}

async function clearCache() {
    // A clean of a huge tree must never overlap with the next tick.
    if (inFlight) {
        console.log('⏳ Cache maintenance already in progress — skipping this run');
        return inFlight;
    }

    inFlight = runClearCache().finally(() => {
        inFlight = null;
    });

    return inFlight;
}

async function runClearCache() {
    const cacheDir = resolveCacheDir();
    const parentDir = path.dirname(cacheDir);

    await sweepOldTrash(parentDir);

    if (!fs.existsSync(cacheDir)) {
        console.log(
            `ℹ️  Cache directory not found at: ${cacheDir} (this is OK if cache is empty)`
        );
        return;
    }

    console.log(`🗑️  Clearing cache at: ${cacheDir}`);
    console.log(`   cwd: ${process.cwd()}`);
    console.log(`   script dir: ${__dirname}`);

    const trashDir = path.join(
        parentDir,
        `${TRASH_PREFIX}${process.pid}-${Date.now()}`
    );

    try {
        // Swap the whole tree out in one atomic step. The Next.js image
        // optimizer running in this same process keeps writing to
        // .next/cache/images/<hash>/... — after the rename those writes land in
        // a fresh directory, so nothing can repopulate the tree we delete. This
        // is what removes the ENOTEMPTY race at the source.
        await fs.promises.rename(cacheDir, trashDir);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('ℹ️  Cache disappeared before it could be cleared — nothing to do');
            return;
        }

        console.warn(
            `⚠️  Atomic swap unavailable (${err.code}) — falling back to in-place clear`
        );

        const raced = await clearInPlace(cacheDir);
        if (raced.length > 0) {
            console.warn(
                `⚠️  Cache cleared with ${raced.length} entrie(s) skipped (in use): ${raced.join(', ')}`
            );
        }
        console.log('✅ Cache cleared successfully at:', new Date().toISOString());
        return;
    }

    // Recreate immediately so any consumer assuming the dir exists is unaffected.
    await fs.promises.mkdir(cacheDir, { recursive: true });

    try {
        await fs.promises.rm(trashDir, RM_OPTIONS);
    } catch (err) {
        // The cache is already detached from the live path, so a leftover trash
        // dir costs disk but breaks nothing — the next run sweeps it.
        if (RACE_CODES.has(err.code)) {
            console.warn(
                `⚠️  Trash dir left for next sweep (${err.code}): ${trashDir}`
            );
        } else {
            console.error('❌ Failed to delete detached cache:', err.message);
            console.error(`   cwd: ${process.cwd()}`);
            console.error(`   trashDir: ${trashDir}`);
            if (err.code === 'EACCES' || err.code === 'EPERM') {
                console.error('   🔒 Permission denied. Check write access on cache directory.');
            }
            const enhanced = new Error(
                `Cache clear failed at ${trashDir}: ${err.message}`
            );
            enhanced.code = err.code;
            enhanced.originalError = err;
            throw enhanced;
        }
    }

    console.log('✅ Cache cleared successfully at:', new Date().toISOString());
}

module.exports = { clearCache, pruneCache, resolveCacheDir, MAX_BYTES, MAX_AGE_MS };

if (require.main === module) {
    // `node scripts/scheduler.js`          -> budget-aware prune
    // `node scripts/scheduler.js --all`    -> full wipe (used by `npm run build`)
    const wipe = process.argv.includes('--all') || process.argv.includes('--clear');
    const run = wipe ? clearCache() : pruneCache();

    run.then(() => {
        console.log(`✅ Manual cache ${wipe ? 'clear' : 'prune'} completed`);
        process.exit(0);
    }).catch((err) => {
        console.error(`❌ Manual cache ${wipe ? 'clear' : 'prune'} failed:`, err);
        process.exit(1);
    });
}
