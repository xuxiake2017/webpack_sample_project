const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: __dirname + "/app/main.js", // 入口
  output: { //  打包输出
    path: __dirname + "/dist", // 路径
    filename: "bundle.js" // 文件名
  },
  // development production
  mode: "production", // 选择模式告诉webpack使用相应的内置优化
  // devtool: "source-map", // 开启source map
  devtool: false,
  // 配置loader
  module: {
    rules: [
      // 使用babel
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
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
  // 添加插件
  plugins: [
    // 为每个 chunk 文件头部添加 banner
    new webpack.BannerPlugin('版权所有，翻版必究'),
    // 这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
    new htmlWebpackPlugin({
      template: __dirname + "/public/index.html"
    }),
  ],
}