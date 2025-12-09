// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

// Note: Sentry initialization happens in sentry.client.config.js to avoid duplicate initialization
// This file only exports the router transition handler

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
