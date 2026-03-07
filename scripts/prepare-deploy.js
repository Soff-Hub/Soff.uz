const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const envArgIndex = args.indexOf('--env');
const env = envArgIndex !== -1 ? args[envArgIndex + 1] : 'local';

const deployDir = 'deploy';

console.log(`[Deploy Setup] Preparing deployment for environment: ${env}`);

// 1. Clean and recreate the 'deploy' directory
if (fs.existsSync(deployDir)) {
    console.log(`[Deploy Setup] Removing existing '${deployDir}' directory...`);
    fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 2. Locate .next/standalone
const standaloneDir = path.join('.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
    console.log(`[Deploy Setup] Copying standalone folder...`);
    fs.cpSync(standaloneDir, deployDir, { recursive: true });
} else {
    console.error(`[Deploy Setup] Error: '${standaloneDir}' does not exist. Did you run 'npm run build' first?`);
    process.exit(1);
}

// 3. Copy .next/static to deploy/.next/static
const staticDir = path.join('.next', 'static');
const destStaticDir = path.join(deployDir, '.next', 'static');
if (fs.existsSync(staticDir)) {
    console.log(`[Deploy Setup] Copying static folder...`);
    fs.mkdirSync(path.dirname(destStaticDir), { recursive: true });
    fs.cpSync(staticDir, destStaticDir, { recursive: true });
} else {
    console.warn(`[Deploy Setup] Warning: '${staticDir}' does not exist.`);
}

// 4. Copy public to deploy/public
const publicDir = 'public';
const destPublicDir = path.join(deployDir, 'public');
if (fs.existsSync(publicDir)) {
    console.log(`[Deploy Setup] Copying public folder...`);
    fs.cpSync(publicDir, destPublicDir, { recursive: true });
} else {
    console.warn(`[Deploy Setup] Warning: '${publicDir}' does not exist.`);
}

// 5. Environment File Logistics
let envSource = env === 'prod' ? '.env.production' : '.env.local';
let envDest = path.join(deployDir, '.env'); // Standalone server reads '.env' by default

// Fallback to .env if specific file doesn't exist
if (!fs.existsSync(envSource)) {
    if (fs.existsSync('.env')) {
        console.log(`[Deploy Setup] '${envSource}' missing, using '.env' as source.`);
        envSource = '.env';
    }
}

if (fs.existsSync(envSource)) {
    console.log(`[Deploy Setup] Copying ${envSource} to ${envDest}...`);
    fs.copyFileSync(envSource, envDest);
} else {
    console.warn(`[Deploy Setup] Warning: No source environment file found (.env.local, .env.production, or .env).`);
}

console.log(`[Deploy Setup] Deployment folder initialized successfully.`);
