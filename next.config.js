const nextSettings = {
    optimizeFonts: true,
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'Soff uz',
        titleDescription:
            'Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.',
    },
    // O'zgarish: 'experimental.serverActions' ni olib tashlash
    experimental: {
        // serverActions: true, // Buni olib tashlang
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
    // O'zgarish: 'presets' ni olib tashlash
    // presets: [
    //     ['@babel/preset-env'],
    //     ['@babel/preset-react', { runtime: 'automatic' }],
    // ],
};

module.exports = nextSettings;
