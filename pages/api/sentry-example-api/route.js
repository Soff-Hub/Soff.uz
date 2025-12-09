import * as Sentry from '@sentry/nextjs';

class SentryExampleBackendError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SentryExampleBackendError';
    }
}

export default async function handler(req, res) {
    await Sentry.startSpan(
        {
            name: 'Example Backend Span',
            op: 'test',
        },
        async () => {
            throw new SentryExampleBackendError(
                'This error is raised on the backend of the example page.'
            );
        }
    );
}
