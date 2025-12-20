const fs = require('fs');
const path = require('path');

async function clearCache() {
    // Find cache directory - handles both development and standalone mode
    let cacheDir;

    // Try multiple possible cache locations
    const possiblePaths = [
        // Standalone mode: from .next/standalone/scripts/ go up to .next/cache
        path.resolve(__dirname, '../../.next/cache'),
        // Or if running from project root
        path.join(process.cwd(), '.next', 'cache'),
        // Or relative to current working directory
        path.resolve('.next/cache'),
    ];

    // Find the first existing cache directory
    for (const cachePath of possiblePaths) {
        if (fs.existsSync(cachePath)) {
            cacheDir = cachePath;
            break;
        }
    }

    // If no cache found, use the most likely location
    if (!cacheDir) {
        cacheDir = path.resolve(__dirname, '../../.next/cache');
    }

    if (fs.existsSync(cacheDir)) {
        console.log(`🗑️  Clearing cache at: ${cacheDir}`);
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

// Export for use in init-scheduler.js
module.exports = { clearCache };

// Only run directly if called as standalone script (for testing)
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
