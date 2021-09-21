const webpack = require('webpack')
const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
}
