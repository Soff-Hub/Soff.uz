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
            throw err;
        }
    } else {
        console.log('ℹ️  Cache directory does not exist');
    }
}

// Export for use in server wrapper
module.exports = { clearCache };

// Run once and exit (for standalone PM2 cron usage)
if (require.main === module) {
    clearCache()
        .then(() => {
            console.log('✅ Scheduler completed');
            process.exit(0);
        })
        .catch((err) => {
            console.error('❌ Scheduler error:', err);
            process.exit(1);
        });
}
