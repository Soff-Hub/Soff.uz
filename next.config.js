const nextSettings = {
    optimizeFonts: false,
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'Soff',
        titleDescription: 'Soff.uz - online hujjatlar bazasi',
    },
    experimental: {
        serverActions: true,
      },
};

module.exports = nextSettings;
