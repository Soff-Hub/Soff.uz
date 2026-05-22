const fs = require('fs');
const path = require('path');

function resolveCacheDir() {
    const possiblePaths = [
        // Runtime cwd must win. deploy/server.js calls process.chdir(__dirname),
        // so this resolves to deploy/.next/cache in deployed builds.
        path.join(process.cwd(), '.next', 'cache'),
        path.resolve('.next/cache'),

        // Standalone runtime before prepare-deploy:
        // .next/standalone/scripts -> .next/cache
        path.resolve(__dirname, '../../cache'),

        // Prepared deploy runtime:
        // deploy/scripts -> deploy/.next/cache
        path.resolve(__dirname, '../.next/cache'),

        // Source script runtime:
        // scripts -> .next/cache
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

async function clearCache() {
    const cacheDir = resolveCacheDir();

    if (fs.existsSync(cacheDir)) {
        console.log(`🗑️  Clearing cache at: ${cacheDir}`);
        console.log(`   cwd: ${process.cwd()}`);
        console.log(`   script dir: ${__dirname}`);

        try {
            await fs.promises.rm(cacheDir, { recursive: true, force: true });
            console.log(
                '✅ Cache cleared successfully at:',
                new Date().toISOString()
            );
        } catch (err) {
            console.error('❌ Failed to clear cache:', err);
            throw err;
        }
    } else {
        console.log(
            `ℹ️  Cache directory not found at: ${cacheDir} (this is OK if cache is empty)`
        );
    }
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
