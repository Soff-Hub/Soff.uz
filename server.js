// Set production mode
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Initialize scheduler (runs daily at 3 AM)
try {
    require('./scripts/init-scheduler.js');
} catch (err) {
    console.warn('⚠️  Failed to initialize scheduler:', err.message);
}


process.env.NODE_ENV = 'production'
process.chdir(__dirname)
const NextServer = require('next/dist/server/next-server').default
const http = require('http')
const path = require('path')

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))
}

let handler

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res)
  } catch (err) {
    console.error(err);
    res.statusCode = 500
    res.end('internal server error')
  }
})
const currentPort = parseInt(process.env.PORT, 10) || 3000

server.listen(currentPort, (err) => {
  if (err) {
    console.error("Failed to start server", err)
    process.exit(1)
  }
  const nextServer = new NextServer({
    hostname: 'localhost',
    port: currentPort,
    dir: path.join(__dirname),
    dev: false,
    customServer: false,
    conf: {"env":{"_sentryRewriteFramesDistDir":".next","_sentryRewriteFramesAssetPrefixPath":"","_sentryRewritesTunnelPath":"/monitoring","_sentryRelease":"0b503b170b71712b19e612f20c33ab68ba167ef4","title":"Soff uz","titleDescription":"Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling."},"webpackDevMiddleware":null,"eslint":{"ignoreDuringBuilds":true},"typescript":{"ignoreBuildErrors":false,"tsconfigPath":"tsconfig.json"},"distDir":"./.next","cleanDistDir":true,"assetPrefix":"","configOrigin":"next.config.js","useFileSystemPublicRoutes":true,"generateEtags":true,"pageExtensions":["tsx","ts","jsx","js"],"target":"server","poweredByHeader":true,"compress":true,"analyticsId":"","images":{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":["eu2.contabostorage.com","d2co7bxjtnp5o.cloudfront.net","api.soff.uz","test-soffuz.s3.amazonaws.com","176.96.241.219","encrypted-tbn0.gstatic.com","www.bukhari.uz","encrypted-tbn0.gstatic.com","localhost","192.168.1.15","media.licdn.com","freelance.soff.uz","freelance.ilmiyish.uz","placehold.co","freelance-media.s3.amazonaws.com","img.youtube.com"],"disableStaticImages":false,"minimumCacheTTL":60,"formats":["image/webp"],"dangerouslyAllowSVG":false,"contentSecurityPolicy":"script-src 'none'; frame-src 'none'; sandbox;","remotePatterns":[],"unoptimized":false},"devIndicators":{"buildActivity":true,"buildActivityPosition":"bottom-right"},"onDemandEntries":{"maxInactiveAge":15000,"pagesBufferLength":2},"amp":{"canonicalBase":""},"basePath":"","sassOptions":{},"trailingSlash":false,"i18n":null,"productionBrowserSourceMaps":false,"optimizeFonts":true,"excludeDefaultMomentLocales":true,"serverRuntimeConfig":{},"publicRuntimeConfig":{},"reactStrictMode":true,"httpAgentOptions":{"keepAlive":true},"outputFileTracing":true,"staticPageGenerationTimeout":60,"swcMinify":false,"output":"standalone","experimental":{"optimisticClientCache":true,"manualClientBasePath":false,"legacyBrowsers":true,"browsersListForSwc":false,"newNextLinkBehavior":false,"cpus":1,"sharedPool":true,"profiling":false,"isrFlushToDisk":true,"workerThreads":false,"pageEnv":false,"optimizeCss":false,"nextScriptWorkers":false,"scrollRestoration":false,"externalDir":false,"disableOptimizedLoading":false,"gzipSize":true,"swcFileReading":true,"craCompat":false,"esmExternals":true,"appDir":false,"isrMemoryCacheSize":52428800,"serverComponents":false,"fullySpecified":false,"outputFileTracingRoot":"","swcTraceProfiling":false,"forceSwcTransforms":false,"largePageDataBytes":128000,"adjustFontFallbacks":false,"instrumentationHook":true,"logging":{"level":"verbose"},"serverComponentsExternalPackages":["amqplib","connect","dataloader","express","generic-pool","graphql","@hapi/hapi","ioredis","kafkajs","koa","lru-memoizer","mongodb","mongoose","mysql","mysql2","knex","pg","pg-pool","@node-redis/client","@redis/client","redis","tedious"],"trustHostHeader":false},"configFileName":"next.config.js"},
  })
  handler = nextServer.getRequestHandler()

  console.log("Listening on port", currentPort)
})
    