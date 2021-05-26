/*
 * Webpack DEVELOPMENT configuration file
 */

const fs = require("fs");
const webpack = require("webpack");

module.exports = {
  mode: "development",

  snapshot: {
    managedPaths: [],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    https: {
      key: fs.readFileSync("./ssl/localhost.develop.apisuite.io-key.pem"),
      cert: fs.readFileSync("./ssl/localhost.develop.apisuite.io.pem"),
    },

    historyApiFallback: true,
    port: 9001,
    host: "localhost.develop.apisuite.io",
    hot: true,
    liveReload: false,
  },

  devtool: "cheap-module-source-map",
};
