const fs = require('fs');
const path = require('path');

// Node's recursive rm retries only on EBUSY / EMFILE / ENFILE / ENOTEMPTY / EPERM,
// and only when maxRetries > 0 (the default is 0 — i.e. fail on first collision).
const RM_OPTIONS = { recursive: true, force: true, maxRetries: 5, retryDelay: 250 };

// Trash dirs live next to .next/cache (same filesystem => rename is atomic).
const TRASH_PREFIX = '.cache-trash-';

// Races against the live server writing into the cache are expected, not failures.
const RACE_CODES = new Set(['ENOTEMPTY', 'EBUSY', 'ENOENT', 'EEXIST']);

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

    return (
        uniquePaths.find((cachePath) => fs.existsSync(cachePath)) ||
        path.join(process.cwd(), '.next', 'cache')
    );
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

let inFlight = null;

async function clearCache() {
    // A clean of a huge tree must never overlap with the next tick.
    if (inFlight) {
        console.log('⏳ Cache clear already in progress — skipping this run');
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

module.exports = { clearCache, resolveCacheDir };

if (require.main === module) {
    clearCache()
        .then(() => {
            console.log('✅ Manual cache clear completed');
            process.exit(0);
        })
        .catch((err) => {
            console.error('❌ Manual cache clear failed:', err);
            process.exit(1);
        });
}
