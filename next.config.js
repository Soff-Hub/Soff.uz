const nextSettings = {
    optimizeFonts: true,
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
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
            'picsum.photos',
            'ui-avatars.com',
        ],
    },
    async headers() {
        // Analytics va Metrikalar ruxsatlari bilan (Google, Yandex, Facebook) toza va tartibli CSP (Content Security Policy) qoidalari
        // const cspHeader = [
        //     "default-src 'self'",
        //     "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com https://mc.yandex.ru https://yastatic.net https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://an.yandex.ru https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
        //     "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://use.fontawesome.com https://fonts.googleapis.com",
        //     "img-src 'self' blob: data: https://eu2.contabostorage.com https://d2co7bxjtnp5o.cloudfront.net https://api.soff.uz https://test-soffuz.s3.amazonaws.com http://176.96.241.219 https://encrypted-tbn0.gstatic.com http://www.bukhari.uz http://localhost http://192.168.1.15 https://media.licdn.com https://freelance.soff.uz https://freelance.ilmiyish.uz https://placehold.co https://freelance-media.s3.amazonaws.com https://img.youtube.com https://mc.yandex.ru https://www.google-analytics.com https://www.facebook.com",
        //     "font-src 'self' data: https://cdnjs.cloudflare.com https://use.fontawesome.com https://fonts.gstatic.com",
        //     "connect-src 'self' https://api.soff.uz wss://api.soff.uz https://freelance.soff.uz wss://freelance.soff.uz *.sentry.io https://mc.yandex.ru wss://mc.yandex.ru https://www.google-analytics.com wss://www.google-analytics.com https://analytics.google.com wss://analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
        //     "frame-src 'self' https://www.youtube.com https://mc.yandex.ru https://yandex.ru https://www.google.com https://recaptcha.google.com https://www.recaptcha.net",
        //     "child-src 'self' https://www.youtube.com https://mc.yandex.ru https://yandex.ru https://www.google.com https://recaptcha.google.com https://www.recaptcha.net"
        // ].join('; ');

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
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    // BIZ QO'SHGAN XAVFSIZLIK DEVORI (CSP)
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: cspHeader,
                    // }
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