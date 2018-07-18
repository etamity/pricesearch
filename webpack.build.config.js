const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
  entry: ['whatwg-fetch', SRC_DIR + '/index.js'],
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: 'bundle.js'
  },
  context: __dirname,
  resolve: {
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        exclude: ['node_modules']
      },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: PUBLIC_DIR,
        to: OUTPUT_DIR
      }
    ]),
    new HtmlWebpackPlugin({
      title: '',
      // save index.html one director back from the output path
      filename: 'index.html',
      template: 'public/index.html',
      hash: false
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        webPreferences: {
          webSecurity: false
        }
      }
    }),
    new BabiliPlugin()
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};
