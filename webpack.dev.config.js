const baseWebpackConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const env = require('./config/dev.env')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: "source-map",
  mode: "development", // 开发模式
  target: "web", // 解决使用browserslist HMR不生效的问题
  devServer: { // 配置dev server
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器内容的来源 建议使用绝对路径（使用nodejs的path）
    historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
    inline: true, // 代码更新，重新加载
    port: 9000, // 端口
    host: '0.0.0.0', // 服务器可从外部访问
    allowedHosts: [
      '.xikcloud.com'
    ],
    hot: true, // 启用 webpack 的 模块热替换 功能
    open: true, // 启动后打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // 把 CSS 插入到 DOM 中
          },
          {
            loader: "css-loader",
            options: {
              // 启用 CSS 模块和设置模式
              // css-loader选项的语法已更改。localIdentName已移至modules选项下
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]', // 配置生成资源的标识符名称
              }
            }
          },
          // 使用postcss（需要配置browserslist）
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
})

module.exports = devWebpackConfig