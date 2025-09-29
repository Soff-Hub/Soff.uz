const fs = require('fs');
const path = require('path');

function clearCache() {
    const cacheDir = path.join(process.cwd(), '.next', 'cache');

    if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true, force: true });
    }
}

// Run every 2 minutes
setInterval(clearCache, 2 * 60 * 1000);

// Run immediately once on start
clearCache();
