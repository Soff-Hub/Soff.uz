const fs = require('fs');
const path = require('path');

async function clearCache() {
    const cacheDir = path.join(process.cwd(), '.next', 'cache');

    if (fs.existsSync(cacheDir)) {
        fs.rm(cacheDir, { recursive: true, force: true }, err => {
            if (err) console.error('Failed to clear cache', err);
            else console.log('Cache cleared ✅');
        });
    }
}

// Run every 2 minutes
setInterval(clearCache, 2 * 60 * 1000);

// Run immediately once on start
clearCache();
