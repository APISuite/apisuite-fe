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
const dotenv = require("dotenv");
const envConf = dotenv.config().parsed;
const portalConf = (envConf.PORTAL_CONFIGURATION && JSON.parse(envConf.PORTAL_CONFIGURATION)) || {};
delete envConf.PORTAL_CONFIGURATION;
const defaultPortalConf = {
  title:"API Suite - Portal",
  ...portalConf,
  meta: {
    title: "API Suite",
    description: "Your very own self-service API integrations ecosystem",
    "og:type" : "website",
    "og:url" : "https://cloudoki.com/",
    "og:title" : "API Suite",
    "og:description" : "Your very own self-service API integrations ecosystem",
    "twitter:card": "summary_large_image",
    "twitter:url":"https://apisuite.io/",
    "twitter:title":"API Suite",
    ...portalConf.meta,
  },
  favicon: path.resolve(__dirname, "src", "favicon.ico"),
  template: path.resolve(__dirname, "src", "index.html"),
  version,
  minify: {
    collapseWhitespace: true,
  },
};
module.exports = {
  mode: "production",

  output: {
    filename: "assets/[name]-[contenthash].js",
    chunkFilename: "assets/[name]-[contenthash].js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(defaultPortalConf),
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
