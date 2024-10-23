const nextSettings = {
    optimizeFonts: false,
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'Soff',
        titleDescription:
            'Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.',
    },
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
            {
                protocol: 'http',
                hostname: '*',
            },
        ],
        domains: ['eu2.contabostorage.com'],
    },
    presets: [
        ['@babel/preset-env'],
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
};

module.exports = nextSettings;
