import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://4d5519b45e78b5e17178ae4017329685@o4510499805134848.ingest.de.sentry.io/4510499809001552',

        // Add optional integrations for additional features
        integrations: [
            // Only enable replay in production and only for errors
            ...(process.env.NODE_ENV === 'production'
                ? [
                      Sentry.replayIntegration({
                          sessionSampleRate: 0, // Don't record normal sessions
                          errorSampleRate: 1.0, // Only record when errors occur
                      }),
                  ]
                : []),
        ],

        // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
        tracesSampleRate: 1,
        // Enable logs to be sent to Sentry
        enableLogs: true,

        // Define how likely Replay events are sampled.
        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0, // Disable session replay

        // Define how likely Replay events are sampled when an error occurs.
        replaysOnErrorSampleRate: 1.0, // Only record on errors

        // Enable sending user PII (Personally Identifiable Information)
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
        sendDefaultPii: true,
    });
} else {
    console.log('🔕 Sentry is disabled in development mode');
}
