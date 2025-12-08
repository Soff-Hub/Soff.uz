const fs = require('fs');
const path = require('path');

const deployDir = path.join(process.cwd(), 'deploy');
const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
const staticDir = path.join(process.cwd(), '.next', 'static');
const publicDir = path.join(process.cwd(), 'public');
const scriptsDir = path.join(process.cwd(), 'scripts');

// Check if build exists
if (!fs.existsSync(standaloneDir)) {
    console.error('❌ Build not found! Run "npm run build" first.');
    process.exit(1);
}

// Create deploy directory
if (fs.existsSync(deployDir)) {
    console.log('🧹 Cleaning old deploy folder...');
    try {
        fs.rmSync(deployDir, {
            recursive: true,
            force: true,
            maxRetries: 3,
            retryDelay: 1000,
        });
        console.log('   ✅ Old folder deleted');
    } catch (error) {
        if (error.code === 'EPERM' || error.code === 'EBUSY') {
            console.warn(
                '   ⚠️  Cannot delete deploy folder - files are locked!'
            );
            console.warn('   💡 This usually means:');
            console.warn(
                '      - PM2 is still running (run: pm2 stop all && pm2 delete all)'
            );
            console.warn('      - File Explorer or IDE has the folder open');
            console.warn(
                '      - Another process is using files in the folder'
            );
            console.warn('');
            console.warn('   🔄 Attempting to overwrite files instead...');
            console.warn(
                '   ⚠️  Some old files might remain. Manual cleanup recommended.'
            );
            // Continue anyway - we'll overwrite what we can
        } else {
            throw error;
        }
    }
}
fs.mkdirSync(deployDir, { recursive: true });

// Copy standalone folder
console.log('📦 Copying standalone build...');
fs.cpSync(standaloneDir, path.join(deployDir, '.next', 'standalone'), {
    recursive: true,
});

// Copy static files to standalone/.next/static
console.log('📦 Copying static files...');
const standaloneStaticDir = path.join(
    deployDir,
    '.next',
    'standalone',
    '.next',
    'static'
);
fs.mkdirSync(standaloneStaticDir, { recursive: true });
if (fs.existsSync(staticDir)) {
    fs.cpSync(staticDir, standaloneStaticDir, { recursive: true });
}

// Copy public folder (needs to be in standalone directory for Next.js to serve it)
console.log('📦 Copying public folder...');
if (fs.existsSync(publicDir)) {
    const deployPublicDir = path.join(deployDir, 'public');
    const standalonePublicDir = path.join(
        deployDir,
        '.next',
        'standalone',
        'public'
    );

    // Remove existing public folders to avoid nested structures
    if (fs.existsSync(deployPublicDir)) {
        fs.rmSync(deployPublicDir, { recursive: true, force: true });
    }
    if (fs.existsSync(standalonePublicDir)) {
        fs.rmSync(standalonePublicDir, { recursive: true, force: true });
    }

    // Copy to deploy root (for reference)
    fs.cpSync(publicDir, deployPublicDir, { recursive: true });
    // Copy to standalone directory (required for Next.js to serve static files)
    fs.cpSync(publicDir, standalonePublicDir, { recursive: true });
    console.log('   ✅ Public folder copied to both locations');
}

// Copy scheduler script
console.log('📦 Copying scheduler script...');
fs.mkdirSync(path.join(deployDir, 'scripts'), { recursive: true });
if (fs.existsSync(path.join(scriptsDir, 'scheduler.js'))) {
    fs.copyFileSync(
        path.join(scriptsDir, 'scheduler.js'),
        path.join(deployDir, 'scripts', 'scheduler.js')
    );
}

// Copy .env file if it exists (for runtime configuration)
console.log('📦 Checking for environment files...');
const envFiles = ['.env', '.env.local', '.env.production'];
envFiles.forEach((envFile) => {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
        console.log(`   Copying ${envFile}...`);
        fs.copyFileSync(envPath, path.join(deployDir, envFile));
    }
});

// Create .env.example template for backend team
console.log('📦 Creating .env.example template...');
const envExampleContent = `# Environment Variables for Production
# Copy this file to .env and update with your production values

# Main API URL
NEXT_PUBLIC_BASE_URL=https://api.soff.uz

# Freelance API URL
NEXT_PUBLIC_FREELEANCE_URL=https://freelance.soff.uz

# Local development URL (optional, for testing)
NEXT_PUBLIC_LOCAL_BASE_URL=http://localhost:8000

# Node Environment
NODE_ENV=production

# Note: NEXT_PUBLIC_* variables are embedded at BUILD TIME for client-side code
# For server-side code (SSR, API routes), you can override them here at runtime
# However, client-side code will use the values from BUILD TIME
`;
fs.writeFileSync(path.join(deployDir, '.env.example'), envExampleContent);

// Create minimal package.json for deployment
console.log('📦 Creating deployment package.json...');
const deployPackageJson = {
    name: 'soffuz',
    version: '1.0.0',
    private: true,
    scripts: {
        start: 'pm2 start ecosystem.config.json',
        'start:server': 'node .next/standalone/server.js',
        'start:scheduler': 'node scripts/scheduler.js',
        'pm2:start': 'pm2 start ecosystem.config.json',
        'pm2:reload': 'pm2 reload ecosystem.config.json',
        'pm2:stop': 'pm2 stop ecosystem.config.json',
        'pm2:logs': 'pm2 logs',
        'pm2:list': 'pm2 list',
    },
    dependencies: {
        'npm-run-all': '^4.1.5',
    },
};

fs.writeFileSync(
    path.join(deployDir, 'package.json'),
    JSON.stringify(deployPackageJson, null, 2)
);

// Create ecosystem.config.json for deployment (using standalone server)
console.log('📦 Creating deployment ecosystem.config.json...');
const deployEcosystemConfig = {
    apps: [
        {
            name: 'soff-web',
            script: '.next/standalone/server.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '1G',
            env_file: '.env',
            env: {
                NODE_ENV: 'production',
                // Environment variables can be set here or in .env file
                // NEXT_PUBLIC_* vars from build time are used for client-side
                // Server-side code can use runtime env vars from .env or here
            },
        },
        {
            name: 'soff-scheduler',
            script: 'scripts/scheduler.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            autorestart: false,
            cron_restart: '0 3 * * *',
            max_memory_restart: '200M',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};

fs.writeFileSync(
    path.join(deployDir, 'ecosystem.config.json'),
    JSON.stringify(deployEcosystemConfig, null, 2)
);

// Create a README for deployment
console.log('📦 Creating deployment README...');
const readmeContent = `# Soff.uz Deployment Package

This is a standalone deployment package. No build step required on the server.

## Quick Start

\`\`\`bash
# Install minimal dependencies (only npm-run-all)
npm install

# Start with PM2 (recommended)
npm run pm2:start

# Or start directly (for testing)
npm run start:server
\`\`\`

## PM2 Commands

- \`npm run pm2:start\` - Start all services
- \`npm run pm2:reload\` - **Zero-downtime reload** (recommended for updates)
- \`npm run pm2:restart\` - Restart (brief downtime)
- \`npm run pm2:stop\` - Stop all services (downtime)
- \`npm run pm2:logs\` - View logs
- \`npm run pm2:list\` - List running processes

## Deployment Workflow (Zero-Downtime Updates)

### First Time Setup:
\`\`\`bash
cd deploy
npm install
npm run pm2:start
\`\`\`

### For Updates (No Downtime):
\`\`\`bash
# 1. Replace deploy folder with new version (from frontend team)
# 2. Reload PM2 (reloads instances one by one - zero downtime!)
npm run pm2:reload
\`\`\`

**Important:** 
- ✅ Use \`pm2:reload\` for updates - **NO downtime** (reloads instances one by one)
- ❌ Don't use \`pm2:stop\` + \`pm2:start\` - this causes downtime
- ✅ \`pm2:reload\` works because you have 2 instances in cluster mode

## What's Included

- ✅ Standalone Next.js server (no node_modules needed)
- ✅ Static assets
- ✅ Public files
- ✅ Scheduler script (runs daily at 3 AM via PM2 cron)
- ✅ PM2 configuration

## Access Your App

After starting with \`npm run pm2:start\`, your app will be available at:

- **Local:** http://localhost:3000
- **Network:** http://127.0.0.1:3000

To check the actual port, run:
\`\`\`bash
pm2 logs soff-web --lines 5
\`\`\`

Look for the line: \`Listening on port XXXX\`

## Notes

- The scheduler runs automatically via PM2 cron at 3:00 AM daily
- Server runs on port 3000 by default (or PORT env variable if set)
- Use PM2 reload for zero-downtime deployments
`;

fs.writeFileSync(path.join(deployDir, 'README.md'), readmeContent);

// Try to detect port from environment or use default
const port = process.env.PORT || process.env.NEXT_PORT || 3000;

console.log('');
console.log('✅ Deployment package created in ./deploy folder');
console.log('📤 Ready to share with backend team!');
console.log('');
console.log('📋 Package contents:');
console.log('   - .next/standalone/ (Next.js server)');
console.log('   - .next/static/ (static assets)');
console.log('   - public/ (public files)');
console.log('   - scripts/scheduler.js');
console.log('   - package.json (minimal)');
console.log('   - ecosystem.config.json (PM2 config)');
console.log('');
console.log('🚀 Backend team can now:');
console.log('   1. cd deploy');
console.log('   2. npm install');
console.log('   3. npm run pm2:start');
console.log('');
console.log('🔄 For updates (zero-downtime):');
console.log('   1. Replace deploy folder with new version');
console.log('   2. npm run pm2:reload  ← No downtime!');
console.log('');
console.log('🌐 After starting, your app will be available at:');
console.log(`   👉 http://localhost:${port}`);
console.log(`   👉 http://127.0.0.1:${port}`);
console.log('');
console.log('💡 To check the actual port after starting, run:');
console.log('   pm2 logs soff-web --lines 5');
