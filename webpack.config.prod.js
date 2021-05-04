/*
 * Webpack PRODUCTION configuration file
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { version } = require("./package.json");

module.exports = {
  mode: "production",

  output: {
    filename: "assets/[name]-[contenthash].js",
    chunkFilename: "assets/[name]-[contenthash].js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "src", "favicon.ico"),
      template: path.resolve(__dirname, "src", "index.html"),
      version,
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: "assets/[name]-[contenthash].css" }),
    new webpack.ids.HashedModuleIdsPlugin(),
    new RobotstxtPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        mangle: { toplevel: true },
        format: { comments: false },
      },
      extractComments: false,
    })],
  },

  devtool: false,
};
