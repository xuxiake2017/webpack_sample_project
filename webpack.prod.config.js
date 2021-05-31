const baseWebpackConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const env = require('./config/prod.env')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
    })
  ],
  optimization: { // 优化
    minimizer: [
      new UglifyJsPlugin(), // 压缩js
      new CssMinimizerPlugin(), // 压缩css
    ],
    /**
     * runtime，以及伴随的 manifest 数据，主要是指：
     * 在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。
     * 它包含：在模块交互时，连接模块所需的加载和解析逻辑。
     * 包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。
     */
    runtimeChunk: 'single', // runtime打包成单个文件
    // splitChunks 可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})

module.exports = devWebpackConfig