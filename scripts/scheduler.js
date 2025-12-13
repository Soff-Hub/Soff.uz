const fs = require('fs');
const path = require('path');

async function clearCache() {
    const cacheDir = path.join(process.cwd(), '.next', 'cache');

    if (fs.existsSync(cacheDir)) {
        fs.rm(cacheDir, { recursive: true, force: true }, (err) => {
            if (err) console.error('Failed to clear cache', err);
        });
    }
}

// Run every 1 day
const oneDayInterval = 24 * 60 * 60 * 1000;
setInterval(clearCache, oneDayInterval);

clearCache();
