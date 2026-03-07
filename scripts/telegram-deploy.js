/**
 * 🚀 Soffia Telegram Deploy Hook (Senior Edition)
 * Optimized for Large Standalone Bundles (via MTProto)
 * 
 * Features:
 * - Direct Zipping of the deploy folder
 * - MTProto upload support up to 2GB (GramJS)
 * - Intelligent Bot API fallback with Chunking
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const axios = require('axios');
const FormData = require('form-data');

// Load environment: Preferred .env.local, then .env.production, then .env
const envPaths = ['.env.local', '.env.production', '.env'];
let envLoaded = false;
for (const envPath of envPaths) {
    const fullPath = path.resolve(process.cwd(), envPath);
    if (fs.existsSync(fullPath)) {
        require('dotenv').config({ path: fullPath });
        console.log(`ℹ️ [Telegram Deploy] Loaded custom env from ${envPath}`);
        envLoaded = true;
        break;
    }
}
if (!envLoaded) {
    require('dotenv').config(); // Use default .env
}

// Load more credentials if available
const botToken = process.env.TG_DEPLOY_BOT_TOKEN;
const chatId = process.env.TG_DEPLOY_CHAT_ID;
const apiId = parseInt(process.env.TG_API_ID || '0');
const apiHash = process.env.TG_API_HASH;

const deployDir = path.resolve(process.cwd(), 'deploy');
const zipFileName = 'deploy-customer-prod.zip';
const zipFilePath = path.resolve(process.cwd(), zipFileName);

async function main() {
    try {
        console.log(`\n──────────────────────────────────────────────`);
        console.log(`🚀 [Telegram Deploy] Starting deployment flow...`);

        if (!fs.existsSync(deployDir)) {
            throw new Error(`Directory '${deployDir}' not found. Run "npm run deploy:local" or similar first.`);
        }

        // 1. Zipping
        await zipDirectory(deployDir, zipFilePath);

        // 2. Uploading
        await uploadToTelegram(zipFilePath);

        // 3. Cleanup
        console.log(`\n🧹 [Telegram Deploy] Cleaning up temporary files...`);
        if (fs.existsSync(zipFilePath)) {
            fs.unlinkSync(zipFilePath);
            console.log(`   ✅ Deleted local zip: ${zipFileName}`);
        }

        console.log(`\n✨ Deployment successful! Soffia is on the move. 🎉`);
        console.log(`──────────────────────────────────────────────\n`);

    } catch (error) {
        console.error(`\n❌ [Telegram Deploy] FAILED:`, error.message);
        process.exit(1);
    }
}

/**
 * Zips the specified folder
 */
function zipDirectory(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        console.log(`📦 [Telegram Deploy] Zipping: ${path.basename(sourceDir)} → ${path.basename(outPath)}`);
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            const size = (archive.pointer() / (1024 * 1024)).toFixed(2);
            console.log(`   ✅ Zip complete: ${size} MB`);
            resolve();
        });

        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

/**
 * Core upload logic
 */
async function uploadToTelegram(filePath) {
    const stats = fs.statSync(filePath);
    const mbSize = stats.size / (1024 * 1024);

    // Try MTProto if credentials exist
    if (apiId && apiHash) {
        console.log(`📤 [Telegram Deploy] Uploading via MTProto (High-Speed)...`);
        try {
            const { TelegramClient } = require('telegram');
            const { StringSession } = require('telegram/sessions');

            const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
                connectionRetries: 5,
            });

            await client.start({
                botAuthToken: botToken,
            });

            console.log(`   🔸 Total size: ${mbSize.toFixed(2)} MB`);

            await client.sendFile(chatId, {
                file: filePath,
                caption: `🚀 [Production Build] customer-platform\n\nVersion: ${process.env.npm_package_version || '1.0.0'}\nSize: ${mbSize.toFixed(2)} MB`,
                workers: 3,
                progressCallback: (p) => {
                    const percentage = (p * 100).toFixed(1);
                    process.stdout.write(`\r   Progress: ${percentage}%`);
                }
            });

            console.log('\n   ✅ Success: Delivered via MTProto.');
            await client.disconnect();
            return;
        } catch (error) {
            console.warn(`\n⚠️  [Telegram Deploy] MTProto failed, falling back to Bot API:`, error.message);
        }
    }

    // Fallback: Bot API
    console.log(`📤 [Telegram Deploy] Using standard Bot API...`);
    const LIMIT = 48 * 1024 * 1024; // 48MB limit

    if (stats.size > LIMIT) {
        console.log(`   ⚠️  Size exceeds Bot API limit. Splitting into chunks...`);
        const buffer = fs.readFileSync(filePath);
        const partCount = Math.ceil(buffer.length / LIMIT);

        for (let i = 0; i < partCount; i++) {
            const start = i * LIMIT;
            const end = Math.min(start + LIMIT, buffer.length);
            const partBuffer = buffer.slice(start, end);
            const partName = `${path.basename(filePath)}.part${i + 1}`;
            const partPath = path.join(path.dirname(filePath), partName);

            fs.writeFileSync(partPath, partBuffer);
            console.log(`   📤 Sending part ${i + 1}/${partCount}...`);
            await sendBotFile(partPath, `📦 [Part ${i + 1}/${partCount}] ${path.basename(filePath)}`);
            fs.unlinkSync(partPath);
        }

        console.log(`\n   💡 Rejoin instructions:`);
        console.log(`      Linux: cat file.zip.part* > file.zip`);
        console.log(`      Windows (PS): Get-Content file.zip.part* | Set-Content file.zip`);
    } else {
        await sendBotFile(filePath, `🚀 [Production Build] customer-platform is ready!`);
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
        console.log(`   ✅ Success: ${path.basename(filePath)} sent.`);
    } catch (error) {
        throw new Error(`Bot API upload failed: ${error.message}`);
    }
}

main();
