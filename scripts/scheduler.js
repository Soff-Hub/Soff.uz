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

// Run every 1 day
const oneDayInterval = 24 * 60 * 60 * 1000;
setInterval(clearCache, oneDayInterval);

// Run immediately once on start
<<<<<<< HEAD
clearCache();
=======
clearCache();
>>>>>>> 88820b001706add2634b3c62c841e70a5ff7ce9d
