import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://4d5519b45e78b5e17178ae4017329685@o4510499805134848.ingest.de.sentry.io/4510499809001552',

        integrations: [
            Sentry.replayIntegration({
                maskAllText: true,
                maskAllInputs: true,
                // Only record sessions where an error actually happens
                // 1.0 means 100% of errors, 0.1 means 10% of errors
                errorSampleRate: 0.1,
                sessionSampleRate: 0,
            }),
        ],

        // --- PERFORMANCE FIXES ---

        // Change from 1.0 to 0.1 (Samples 10% of traffic)
        // 1.0 is far too heavy for a high-traffic production site
        tracesSampleRate: 0.1,

        // Turn off debug logs in production to save CPU/Memory
        enableLogs: false,

        // Disable this unless you specifically need it; it adds overhead
        sendDefaultPii: false,

        // Keeps your bundle smaller by not including Replay code if not needed
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0.1,
    });
}
