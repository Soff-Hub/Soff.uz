/** @type {import('next').NextConfig} */

// Micro-service internal endpoints (Proxies/Rewrites)
// Defaults to localhost for development if .env variables are missing
const SERVICE_URL_VIDEO = process.env.SERVICE_URL_VIDEO || 'http://localhost:3005';
const SERVICE_URL_FREELANCE = process.env.SERVICE_URL_FREELANCE || 'http://localhost:3006';
const SERVICE_URL_CREATORS = process.env.SERVICE_URL_CREATORS || 'http://localhost:3000';
// SoffX AI (SoffAIGenFrontend), built with NEXT_PUBLIC_BASE_PATH=/labs.
const SERVICE_URL_LABS = process.env.SERVICE_URL_LABS || 'http://127.0.0.1:3010';
// Soff.uz's own API, for SoffX at /labs through /soffuz-api: its sign-in bridge
// then trades the token with the backend that issued it, whichever one .env picks.
const SOFFUZ_API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.soff.uz';

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
    experimental: {
        // See the first redirect: /labs/* keeps its trailing slash.
        skipTrailingSlashRedirect: true,
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
            'picsum.photos',
            'ui-avatars.com',
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
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://*.yandex.ru https://*.yandex.uz https://*.yandex.kz https://*.yandex.com https://*.webvisor.com blob:;",
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
    async redirects() {
        return [
            // Next's own "/x/ → /x" redirect is off (experimental.skipTrailingSlashRedirect)
            // because SoffX at /labs calls API paths that must keep their slash
            // (and so does /soffuz-api, Soff.uz's API for it).
            // Same redirect for everything else.
            {
                source: '/:path((?!labs(?:/|$)|soffuz-api/).+)/',
                destination: '/:path',
                permanent: true,
            },
            // www.soff.uz served every page with 200, giving Google a full
            // duplicate host. Consolidate it onto the canonical apex domain.
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.soff.uz' }],
                destination: 'https://soff.uz/:path*',
                permanent: true,
            },
            // Soffia AI has moved to SoffX AI at /labs. Keep old /soffia links working.
            {
                source: '/soffia',
                destination: '/labs',
                permanent: true,
            },
            {
                source: '/soffia/:path*',
                destination: '/labs',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/studio/:path*',
                destination: `${SERVICE_URL_VIDEO}/studio/:path*`,
            },
            {
                source: '/freelance/:path*',
                destination: `${SERVICE_URL_FREELANCE}/freelance/:path*`,
            },
            {
                source: '/labs',
                destination: `${SERVICE_URL_LABS}/labs`,
            },
            // `:path*` drops a trailing slash, which SoffX's API paths need.
            {
                source: '/labs/:path*/',
                destination: `${SERVICE_URL_LABS}/labs/:path*/`,
            },
            {
                source: '/labs/:path*',
                destination: `${SERVICE_URL_LABS}/labs/:path*`,
            },
            // Soff.uz's API for SoffX's sign-in bridge (SoffAIGenFrontend soffuz-bridge.ts).
            {
                source: '/soffuz-api/:path*/',
                destination: `${SOFFUZ_API_URL}/:path*/`,
            },
            {
                source: '/soffuz-api/:path*',
                destination: `${SOFFUZ_API_URL}/:path*`,
            },
            // SoffX renders some public files (<video>, posters) by their bare
            // path, without /labs. Soff.uz has nothing at these paths.
            ...['images', 'videos', 'logos', 'landing'].map((dir) => ({
                source: `/${dir}/:path*`,
                destination: `${SERVICE_URL_LABS}/labs/${dir}/:path*`,
            })),
            {
                source: '/creators',
                destination: `${SERVICE_URL_CREATORS}/creators`,
            },
            {
                source: '/creators/:path*',
                destination: `${SERVICE_URL_CREATORS}/creators/:path*`,
            },
        ];
    },
};

module.exports = nextSettings;
