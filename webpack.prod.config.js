const baseWebpackConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const env = require('./config/prod.env')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: false,
  mode: "production", // 生产模式
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          /*
          * 推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。
          * 这可以通过使用 mini-css-extract-plugin 来实现，因为它可以创建单独的 CSS 文件。
          * 对于 development 模式（包括 webpack-dev-server），你可以使用 style-loader，因为它可以使用多个标签将 CSS 插入到 DOM 中，并且反应会更快
          * */
          {
            loader: MiniCssExtractPlugin.loader, // 与style-loader不可以同时使用
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
    // 允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 用于删除/清理您的构建文件夹
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  optimization: { // 优化
    minimizer: [
      new UglifyJsPlugin() // 压缩js
    ]
  }
})

module.exports = devWebpackConfig