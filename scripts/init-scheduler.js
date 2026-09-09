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
let pruneCache;
const schedulerPaths = [
    path.join(__dirname, 'scheduler.js'),
    path.join(process.cwd(), 'scripts', 'scheduler.js'),
];

let schedulerLoaded = false;
for (const schedulerPath of schedulerPaths) {
    if (fs.existsSync(schedulerPath)) {
        try {
            ({ clearCache, pruneCache } = require(schedulerPath));
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
    const noop = async () => {
        console.log('ℹ️  Scheduler not available');
    };
    clearCache = noop;
    pruneCache = noop;
}

// Every hour, not once a day: on a release serving user-uploaded images the
// Next 12 optimizer can write several GB between two 3 AM runs, and the disk
// fills long before the daily job ever fires.
const PRUNE_CRON = process.env.CACHE_PRUNE_CRON || '0 * * * *';

async function runMaintenance(trigger) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🔄 Cache maintenance (${trigger})...`);
    try {
        await pruneCache();
    } catch (err) {
        console.error(`[${timestamp}] ❌ Cache maintenance failed:`, err.message);
        const msg = `[Cache Cleaner] Cache prune fail at ${timestamp}\nServer: ${require('os').hostname()}\nError: ${err.message}\ncwd: ${process.cwd()}\nscript: ${__dirname}`;
        await notifyTelegram(msg);
    }
}

console.log(`🕐 Initializing cache scheduler (prune cron: ${PRUNE_CRON}, Asia/Tashkent)...`);

cron.schedule(PRUNE_CRON, () => runMaintenance('scheduled'), {
    scheduled: true,
    timezone: 'Asia/Tashkent',
});

// A restart is the most likely moment for the disk to already be full (a deploy
// just landed a fresh release), so don't wait up to an hour for the first run.
// Delayed so it never competes with server start-up.
setTimeout(() => {
    runMaintenance('startup');
}, 60 * 1000).unref();

console.log('✅ Scheduler initialized');

module.exports = { runMaintenance, clearCache, pruneCache };
