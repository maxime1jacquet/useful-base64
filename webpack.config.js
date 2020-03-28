const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    Path.resolve(__dirname, './src/scripts/index.ts'),
    Path.resolve(__dirname, './src/stylesheets/index.scss')
  ],
  output: {
    path: Path.join(__dirname, './dist'),
    chunkFilename: 'app.js',
    filename: 'js/app.js'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     name: false
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, './src/server.js'), to: 'server.js' }
    ]),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, './src/manifest.json'),
        to: 'manifest.json'
      }
    ]),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, './src/assets'), to: 'assets' }
    ]),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, './src/serviceWorker.js'),
        to: 'serviceWorker.js'
      }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, './src/index.html')
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'ts-loader'
      },

      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'stylesheets/[name].css'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};
