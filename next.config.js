const { i18n } = require('./next-i18next.config');

const nextSettings = {
    i18n,
    optimizeFonts: true,
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        logging: {
            level: 'verbose',
        },
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        title: 'Soff uz',
        titleDescription:
            'Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.',
    },
    images: {
        domains: [
            'eu2.contabostorage.com',
            'd2co7bxjtnp5o.cloudfront.net',
            'api.soff.uz',
            'test-soffuz.s3.amazonaws.com',
            '176.96.241.219',
            'encrypted-tbn0.gstatic.com',
            'www.bukhari.uz',
            'encrypted-tbn0.gstatic.com',
            'localhost',
            '192.168.1.15',
            'media.licdn.com',
            'freelance.soff.uz',
            'freelance.ilmiyish.uz',
            'placehold.co',
            'freelance-media.s3.amazonaws.com',
            'img.youtube.com',
        ],
    },
    async headers() {
        return [
            // Security headers for Lighthouse Best Practices
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(self)',
                    },
                ],
            },
            // Caching static files for 1 year
            {
                source: '/:all*(svg|jpg|png|jpeg|gif|ico|webp|avif|jfif|pjpeg|pjp|apng|bmp|tif|tiff|js|css|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Caching API responses for 5 minutes
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=59',
                    },
                ],
            },
            // IMPORTANT: Exclude product pages from caching
            {
                source: '/product/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, private, max-age=0',
                    },
                ],
            },
            // SSR pages cached for 1 minute
            {
                source: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|jpg|png|jpeg|gif|ico|webp|avif|jfif|pjpeg|pjp|apng|bmp|tif|tiff|js|css|woff2)).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=60, s-maxage=120, stale-while-revalidate=59',
                    },
                ],
            },
        ];
    },
};

module.exports = nextSettings;

if (process.env.NODE_ENV === 'production') {
    const { withSentryConfig } = require('@sentry/nextjs');

    module.exports = withSentryConfig(module.exports, {
        org: 'for-personal-use-jw',
        project: 'javascript-nextjs',

        hideSourceMaps: true,
        disableLogger: true,
        widenClientFileUpload: true,
        silent: true,
        webpack: (config) => {
            return {
                ...config,
                treeshake: {
                    removeDebugLogging: true,
                    removeTracing: false,
                },
            };
        },

        tunnelRoute: '/monitoring',
        automaticVercelMonitors: true,
    });
}
