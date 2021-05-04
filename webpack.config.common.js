/*
 * Webpack Common configuration file
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

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
        test: /\.(gif|svg|webp|jpg|png|ttf)$/,
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
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src", "index.html") }),
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
