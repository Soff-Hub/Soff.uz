import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'middleware.log');

export function log(...args: any[]) {
    const timestamp = new Date().toISOString();
    const message = args
        .map((arg) =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(' ');

    const logLine = `[${timestamp}] ${message}\n`;

    // Write to file
    fs.appendFileSync(logFile, logLine);

    // Also log to console
    console.log(...args);
}
