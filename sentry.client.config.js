import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://4d5519b45e78b5e17178ae4017329685@o4510499805134848.ingest.de.sentry.io/4510499809001552',

        integrations: [
            Sentry.replayIntegration({
                maskAllText: true,
                maskAllInputs: true,
            }),
        ],
        tracesSampleRate: 0.05,
        enableLogs: false,
        sendDefaultPii: false,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0.05,
        ignoreErrors: [
            // Browser extensions
            'top.GLOBALS',
            // Random plugins/extensions
            'originalCreateNotification',
            'canvas.contentDocument',
            'MyApp_RemoveAllHighlights',
            // Facebook errors
            'fb_xd_fragment',
            // Network errors that users can't control
            'NetworkError',
            'Failed to fetch',
            'Load failed',
        ],
        beforeSend(event, hint) {
            // Sample only 50% of non-critical errors
            if (event.level === 'error' && Math.random() > 0.5) {
                return null;
            }
            return event;
        },
    });
}
