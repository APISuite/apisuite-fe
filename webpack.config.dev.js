/*
 * Webpack DEVELOPMENT configuration file
 */

const webpack = require("webpack");

module.exports = {
  mode: "development",

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    port: 9001,
    host: "localhost.develop.apisuite.io",
    hot: true,
    liveReload: false,
  },

  devtool: "cheap-module-source-map",
};
