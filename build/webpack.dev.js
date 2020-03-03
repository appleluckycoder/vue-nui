/**
 * Webpack config under development
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV

const webpackConfig = {
  mode: env === 'production' ? 'production' : 'development',
  entry: './demo/devIndex',
  output: {
    path: path.resolve(process.cwd()),
    publicPath: '/',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.entry'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8086,
    publicPath: '/',
    hot: true,
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: config.docLoaders
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.tpl',
      favicon: './demo/assets/images/naivelogo.svg'
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ]
}

module.exports = webpackConfig
