#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function clearCacheOnce() {
    try {
        const cacheDir = path.join(process.cwd(), '.next', 'cache');

        // Check if cache directory exists
        try {
            await fs.access(cacheDir);
        } catch (err) {
            console.log('Cache directory does not exist, skipping cleanup');
            process.exit(0);
        }

        console.log('Starting cache cleanup...');
        await fs.rm(cacheDir, { recursive: true, force: true });
        console.log('Cache cleared successfully at:', new Date().toISOString());
        process.exit(0);
    } catch (err) {
        console.error('Failed to clear cache:', err.message);
        process.exit(1);
    }
}

// Run once and exit
clearCacheOnce();
