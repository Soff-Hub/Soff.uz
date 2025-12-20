// Initialize scheduler to run cache clearing daily at 3 AM
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

// Import scheduler function
let clearCache;
const schedulerPaths = [
    path.join(__dirname, 'scheduler.js'),
    path.join(process.cwd(), 'scripts', 'scheduler.js'),
];

let schedulerLoaded = false;
for (const schedulerPath of schedulerPaths) {
    if (fs.existsSync(schedulerPath)) {
        try {
            clearCache = require(schedulerPath).clearCache;
            schedulerLoaded = true;
            break;
        } catch (err) {
            // Continue to next path
        }
    }
}

if (!schedulerLoaded) {
    console.warn(
        '⚠️  Could not load scheduler script. Cache clearing will be disabled.'
    );
    clearCache = async () => {
        console.log('ℹ️  Scheduler not available');
    };
}

// Initialize scheduler - Production mode: runs daily at 3 AM
console.log('🕐 Initializing cache scheduler (runs daily at 3:00 AM)...');

// Schedule to run daily at 3 AM
const job = cron.schedule(
    '0 3 * * *',
    async () => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] 🔄 Running scheduled cache clear...`);
        try {
            await clearCache();
            console.log(
                `[${timestamp}] ✅ Scheduled cache clear completed successfully`
            );
        } catch (err) {
            console.error(
                `[${timestamp}] ❌ Scheduled cache clear failed:`,
                err
            );
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Tashkent', // Adjust to your timezone if needed
    }
);

console.log('✅ Scheduler initialized');
console.log('   Next scheduled run: Daily at 3:00 AM');

// Export nothing - this is a side-effect module that initializes the scheduler
module.exports = {};
