const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, './src/scripts/index.ts')
  },

  output: {
    path: Path.join(__dirname, './build'),
    chunkFilename: '[name].js',
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
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
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  },
  devtool: 'source-map'
};
