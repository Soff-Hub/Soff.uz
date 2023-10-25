// @type {import('next').NextConfig}
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
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'api.soff.uz',
    //             port: '',
    //             pathname: '/media/banner',
    //         },
    //     ],
    // },
};
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    images: {
      formats: ['image/avif', 'image/webp','image/png'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.soff.uz',
          port: '',
          pathname: '/image/upload/**',
        },
      ],
    },
  }

// module.exports = nextConfig;
module.exports = nextSettings;
