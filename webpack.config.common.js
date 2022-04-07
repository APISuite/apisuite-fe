/*
 * Webpack Common configuration file
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const dotenv = require("dotenv");
const webpack = require("webpack");
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
  template: path.resolve(__dirname, "src", "index.html"),
};

console.log(defaultPortalConf);
module.exports = {
  entry: path.resolve(__dirname, "src", "index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|svg|webp|jpg|png|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "assets/images/[name]-[contenthash].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envConf),
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin(defaultPortalConf),
    new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
  ],

  resolve: {
    symlinks: false,
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
    ],
    fallback: {
      util: false,
      path: false,
      crypto: false,
      https: false,
      http: false,
      vm: false,
      os: false,
      tty: false,
      console: false,
      constants: false,
      assert: false,
      fs: false,
      zlib: false,
    },
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
