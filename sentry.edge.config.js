import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://4d5519b45e78b5e17178ae4017329685@o4510499805134848.ingest.de.sentry.io/4510499809001552',
        tracesSampleRate: 1,
        enableLogs: true,
        sendDefaultPii: true,
    });
} else {
    console.log('🔕 Sentry is disabled in development mode');
}
