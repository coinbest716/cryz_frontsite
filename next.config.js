const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/resource-timeline',
  '@fullcalendar/timeline',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
])
const withGraphql = require('next-plugin-graphql')

const appConfig = {
  images: {
    domains: ['crysdiaz-public.s3.eu-west-1.amazonaws.com', 'via.placeholder.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 1024, 1536, 2048],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
}

//module.exports = withGraphql(withTM(appConfig))
module.exports = withSentryConfig(withGraphql(withTM(appConfig)), sentryWebpackPluginOptions)
//module.exports = withTM(appConfig)
