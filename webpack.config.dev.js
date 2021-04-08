/*
 * Webpack DEVELOPMENT configuration file
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/',
    historyApiFallback: true,
    port: 9001,
    host: 'localhost.develop.apisuite.io',
    noInfo: false,
    inline: true,
    hot: true,
    stats: {
      entrypoints: false,
      children: false,
      modules: false,
      colors: true,
      excludeAssets: (assetName) => assetName.endsWith('.map'),
    },
  },

  devtool: 'cheap-module-source-map',
}
