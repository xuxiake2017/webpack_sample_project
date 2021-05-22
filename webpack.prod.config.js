const baseWebpackConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: false,
  mode: "production", // 生产模式
})

module.exports = devWebpackConfig