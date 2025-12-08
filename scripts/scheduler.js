const fs = require('fs');
const path = require('path');

async function clearCache() {
    const cacheDir = path.join(process.cwd(), '.next', 'cache');

    if (fs.existsSync(cacheDir)) {
        try {
            await fs.promises.rm(cacheDir, { recursive: true, force: true });
            console.log('✅ Cache cleared successfully');
        } catch (err) {
            console.error('❌ Failed to clear cache:', err);
            process.exit(1);
        }
    } else {
        console.log('ℹ️  Cache directory does not exist');
    }
}

// Run once and exit (PM2 cron will handle the scheduling)
clearCache()
    .then(() => {
        console.log('✅ Scheduler completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Scheduler error:', err);
        process.exit(1);
    });
