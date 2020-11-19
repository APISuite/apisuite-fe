/*
 * Webpack Common configuration file
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const Dotenv = require('dotenv-webpack')

const THEME = process.env.THEME

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([autoprefixer()]),
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/fonts/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/docs/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'src', 'themes', String(THEME), 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'themes', String(THEME), 'index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}