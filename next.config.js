const path = require('path')
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
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
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

module.exports = withGraphql(withTM(appConfig))
