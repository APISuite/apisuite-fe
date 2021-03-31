/*
 * Webpack Common configuration file
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolveLoader: {
    alias: {
      'conditional-loader': path.join(__dirname, './scripts/conditional-loader'),
    },
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
          // {
          //   loader: '@epegzz/sass-vars-loader',
          //   options: {
          //     syntax: 'scss',
          //     files: [path.resolve(__dirname, 'src/theme/index.js')],
          //   },
          // },
        ],
      },
      {
        test: /\.(gif|svg|webp|jpg|png|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
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
    ],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],

  resolve: {
    symlinks: false,
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
