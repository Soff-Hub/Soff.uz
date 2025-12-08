// Simple script to inject scheduler into Next.js server.js and copy scheduler files to standalone folder after build
const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
const scriptsDir = path.join(standaloneDir, 'scripts');

// Check if standalone exists
if (!fs.existsSync(standaloneDir)) {
    console.error('❌ Standalone folder not found! Run "npm run build" first.');
    process.exit(1);
}

// Inject scheduler initialization into Next.js server.js
console.log('📦 Injecting scheduler into Next.js server.js...');
const nextServerJsPath = path.join(standaloneDir, 'server.js');
if (fs.existsSync(nextServerJsPath)) {
    // Read the Next.js server.js
    let serverContent = fs.readFileSync(nextServerJsPath, 'utf8');
    
    // Prepend scheduler initialization at the very beginning
    // Set NODE_ENV to production for standalone server
    const schedulerInit = `// Set production mode
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Initialize scheduler (runs daily at 3 AM)
try {
    require('./scripts/init-scheduler.js');
} catch (err) {
    console.warn('⚠️  Failed to initialize scheduler:', err.message);
}

`;
    
    // Inject at the beginning
    serverContent = schedulerInit + serverContent;
    
    // Write back
    fs.writeFileSync(nextServerJsPath, serverContent, 'utf8');
    console.log('   ✅ Scheduler injected into server.js');
} else {
    console.warn('   ⚠️  Next.js server.js not found');
}

// Copy scheduler scripts to standalone/scripts
console.log('📦 Copying scheduler scripts to standalone...');
fs.mkdirSync(scriptsDir, { recursive: true });

const schedulerPath = path.join(process.cwd(), 'scripts', 'scheduler.js');
if (fs.existsSync(schedulerPath)) {
    fs.copyFileSync(schedulerPath, path.join(scriptsDir, 'scheduler.js'));
    console.log('   ✅ scheduler.js copied');
} else {
    console.warn('   ⚠️  scheduler.js not found');
}

const initSchedulerPath = path.join(process.cwd(), 'scripts', 'init-scheduler.js');
if (fs.existsSync(initSchedulerPath)) {
    fs.copyFileSync(initSchedulerPath, path.join(scriptsDir, 'init-scheduler.js'));
    console.log('   ✅ init-scheduler.js copied');
} else {
    console.warn('   ⚠️  init-scheduler.js not found');
}

// Copy node-cron to standalone/node_modules (required by init-scheduler.js)
console.log('📦 Copying node-cron to standalone...');
const standaloneNodeModules = path.join(standaloneDir, 'node_modules');
const nodeCronSource = path.join(process.cwd(), 'node_modules', 'node-cron');
const nodeCronDest = path.join(standaloneNodeModules, 'node-cron');

if (fs.existsSync(nodeCronSource)) {
    if (!fs.existsSync(standaloneNodeModules)) {
        fs.mkdirSync(standaloneNodeModules, { recursive: true });
    }
    // Copy entire node-cron directory
    if (fs.existsSync(nodeCronDest)) {
        fs.rmSync(nodeCronDest, { recursive: true, force: true });
    }
    fs.cpSync(nodeCronSource, nodeCronDest, { recursive: true });
    console.log('   ✅ node-cron copied');
} else {
    console.warn('   ⚠️  node-cron not found in node_modules. Make sure it\'s installed.');
}

// Copy static files (.next/static) to standalone/.next/static
console.log('📦 Copying static files to standalone...');
const staticDir = path.join(process.cwd(), '.next', 'static');
const standaloneStaticDir = path.join(standaloneDir, '.next', 'static');

if (fs.existsSync(staticDir)) {
    if (fs.existsSync(standaloneStaticDir)) {
        fs.rmSync(standaloneStaticDir, { recursive: true, force: true });
    }
    fs.mkdirSync(path.join(standaloneDir, '.next'), { recursive: true });
    fs.cpSync(staticDir, standaloneStaticDir, { recursive: true });
    console.log('   ✅ Static files copied');
} else {
    console.warn('   ⚠️  .next/static folder not found');
}

// Copy public folder to standalone/public (required for static assets)
console.log('📦 Copying public folder to standalone...');
const publicDir = path.join(process.cwd(), 'public');
const standalonePublicDir = path.join(standaloneDir, 'public');

if (fs.existsSync(publicDir)) {
    if (fs.existsSync(standalonePublicDir)) {
        fs.rmSync(standalonePublicDir, { recursive: true, force: true });
    }
    fs.cpSync(publicDir, standalonePublicDir, { recursive: true });
    console.log('   ✅ Public folder copied');
} else {
    console.warn('   ⚠️  public folder not found');
}

console.log('');
console.log('✅ Standalone folder is ready!');
console.log('🚀 Run: node .next/standalone/server.js');

