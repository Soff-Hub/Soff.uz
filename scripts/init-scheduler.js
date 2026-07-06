const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const https = require('https');

let botToken = process.env.TG_DEPLOY_BOT_TOKEN;
let chatId = process.env.TG_DEPLOY_CHAT_ID;

if (!botToken || !chatId) {
    const envFile = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envFile)) {
        const lines = fs.readFileSync(envFile, 'utf8').split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            const clean = val.replace(/^["']|["']$/g, '');
            if (key === 'TG_DEPLOY_BOT_TOKEN') botToken = clean;
            if (key === 'TG_DEPLOY_CHAT_ID') chatId = clean;
        }
    }
}

function notifyTelegram(text) {
    return new Promise((resolve) => {
        if (!botToken || !chatId) {
            resolve(false);
            return;
        }
        const payload = JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
        });
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${botToken}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
            },
        };
        const req = https.request(options, (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', (err) => {
            console.warn('[Cache Cleaner] Telegram notify failed:', err.message);
            resolve(false);
        });
        req.write(payload);
        req.end();
    });
}

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

console.log('🕐 Initializing cache scheduler (runs daily at 3:00 AM)...');

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
                err.message
            );
            const msg = `[Cache Cleaner] Cache clear fail at ${timestamp}\nServer: ${require('os').hostname()}\nError: ${err.message}\ncwd: ${process.cwd()}\nscript: ${__dirname}`;
            await notifyTelegram(msg);
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Tashkent',
    }
);

console.log('✅ Scheduler initialized');
console.log('   Next scheduled run: Daily at 3:00 AM');

module.exports = {};
