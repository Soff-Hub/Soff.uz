const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const axios = require('axios');
const FormData = require('form-data');

function resolveProjectRoot() {
    let dir = path.resolve(__dirname);
    for (let i = 0; i < 5; i++) {
        if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
    }
    return process.cwd();
}

const projectRoot = resolveProjectRoot();

const envPaths = ['.env.local', '.env.production', '.env'];
let envLoaded = false;
for (const envPath of envPaths) {
    const fullPath = path.resolve(projectRoot, envPath);
    if (fs.existsSync(fullPath)) {
        require('dotenv').config({ path: fullPath });
        console.log(`[Telegram Deploy] Loaded env from ${envPath}`);
        envLoaded = true;
        break;
    }
}
if (!envLoaded) {
    require('dotenv').config();
    console.log('[Telegram Deploy] Loaded default .env');
}

const botToken = process.env.TG_DEPLOY_BOT_TOKEN;
const chatId = process.env.TG_DEPLOY_CHAT_ID;
const apiId = parseInt(process.env.TG_API_ID || '0');
const apiHash = process.env.TG_API_HASH;

function findDeployDir() {
    const candidates = [
        path.resolve(projectRoot, 'deploy'),
        path.resolve(process.cwd(), 'deploy'),
        path.resolve(projectRoot, '.next', 'standalone'),
    ];
    for (const dir of candidates) {
        if (fs.existsSync(dir)) return dir;
    }
    return candidates[0];
}

const deployDir = findDeployDir();
const zipFileName = 'deploy-customer-prod.zip';
const zipFilePath = path.resolve(projectRoot, zipFileName);

async function sendTelegramMessage(text) {
    if (!botToken || !chatId) {
        console.log('[Telegram Deploy] Missing TG_DEPLOY_BOT_TOKEN or TG_DEPLOY_CHAT_ID. Cannot send message.');
        return false;
    }
    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
        });
        console.log('[Telegram Deploy] Message sent successfully.');
        return true;
    } catch (error) {
        console.warn('[Telegram Deploy] Failed to send message:', error.message);
        return false;
    }
}

async function main() {
    try {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`[Telegram Deploy] Starting deployment flow...`);
        console.log(`[Telegram Deploy] Project root: ${projectRoot}`);
        console.log(`[Telegram Deploy] Working dir:  ${process.cwd()}`);
        console.log(`[Telegram Deploy] Target dir:   ${deployDir}`);

        const exists = fs.existsSync(deployDir);
        console.log(`[Telegram Deploy] Target exists: ${exists}`);

        if (!exists || !fs.readdirSync(deployDir).length) {
            console.warn(`[Telegram Deploy] Deploy directory not found or empty at: ${deployDir}`);

            const msg = `[CI/CD] Build completed but deploy directory not found.\nEnv: ${process.env.NODE_ENV || 'unknown'}\nTime: ${new Date().toISOString()}`;
            await sendTelegramMessage(msg);

            console.log('[Telegram Deploy] Skipping zip upload, notification sent.');
            return;
        }

        await zipDirectory(deployDir, zipFilePath);

        await uploadToTelegram(zipFilePath);

        console.log(`\n[Telegram Deploy] Cleaning up temporary files...`);
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
            console.log(`   Deleted local zip: ${zipFileName}`);
        }

        console.log(`\n[Telegram Deploy] Deployment flow completed.`);
        console.log(`${'='.repeat(50)}\n`);

    } catch (error) {
        console.error(`\n[Telegram Deploy] FAILED:`, error.message);

        try {
            const msg = `[CI/CD] Deploy failed: ${error.message}\nTime: ${new Date().toISOString()}`;
            await sendTelegramMessage(msg);
        } catch (_) {}

        process.exit(1);
    }
}

function zipDirectory(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        console.log(`[Telegram Deploy] Zipping: ${path.basename(sourceDir)} -> ${path.basename(outPath)}`);
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            const size = (archive.pointer() / (1024 * 1024)).toFixed(2);
            console.log(`   Zip complete: ${size} MB`);
            resolve();
        });

        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

async function uploadToTelegram(filePath) {
    const stats = fs.statSync(filePath);
    const mbSize = stats.size / (1024 * 1024);

    if (apiId && apiHash) {
        console.log(`[Telegram Deploy] Uploading via MTProto...`);
        try {
            const { TelegramClient } = require('telegram');
            const { StringSession } = require('telegram/sessions');

            const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
                connectionRetries: 5,
            });

            await client.start({ botAuthToken: botToken });
            console.log(`   Size: ${mbSize.toFixed(2)} MB`);

            await client.sendFile(chatId, {
                file: filePath,
                caption: `[Production Build] customer-platform\nVersion: ${process.env.npm_package_version || '1.0.0'}\nSize: ${mbSize.toFixed(2)} MB`,
                workers: 3,
                progressCallback: (p) => {
                    process.stdout.write(`\r   Progress: ${(p * 100).toFixed(1)}%`);
                }
            });

            console.log('\n   Success: Delivered via MTProto.');
            await client.disconnect();
            return;
        } catch (error) {
            console.warn(`\n[Telegram Deploy] MTProto failed, falling back to Bot API: ${error.message}`);
        }
    }

    console.log(`[Telegram Deploy] Using Bot API...`);
    const LIMIT = 48 * 1024 * 1024;

    if (stats.size > LIMIT) {
        console.log(`   Size exceeds Bot API limit. Splitting into chunks...`);
        const buffer = fs.readFileSync(filePath);
        const partCount = Math.ceil(buffer.length / LIMIT);

        for (let i = 0; i < partCount; i++) {
            const start = i * LIMIT;
            const end = Math.min(start + LIMIT, buffer.length);
            const partBuffer = buffer.slice(start, end);
            const partName = `${path.basename(filePath)}.part${i + 1}`;
            const partPath = path.join(path.dirname(filePath), partName);

            fs.writeFileSync(partPath, partBuffer);
            console.log(`   Sending part ${i + 1}/${partCount}...`);
            await sendBotFile(partPath, `[Part ${i + 1}/${partCount}] ${path.basename(filePath)}`);
            fs.unlinkSync(partPath);
        }

        console.log(`\n   Rejoin instructions:`);
        console.log(`      Linux/Mac: cat file.zip.part* > file.zip`);
        console.log(`      Windows: copy /B file.zip.part* file.zip`);
    } else {
        await sendBotFile(filePath, `[Production Build] customer-platform is ready!`);
    }
}

async function sendBotFile(filePath, caption) {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('document', fs.createReadStream(filePath));
    form.append('caption', caption);

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendDocument`;
        await axios.post(url, form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        console.log(`   Success: ${path.basename(filePath)} sent.`);
    } catch (error) {
        throw new Error(`Bot API upload failed: ${error.message}`);
    }
}

main();
