const baseWebpackConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: "source-map",
  mode: "development", // 开发模式
  devServer: { // 配置dev server
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器内容的来源 建议使用绝对路径（使用nodejs的path）
    historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
    inline: true, // 代码更新，重新加载
    port: 9000, // 端口
    hot: true, // 启用 webpack 的 模块热替换 功能
  },
  plugins: [
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = devWebpackConfig