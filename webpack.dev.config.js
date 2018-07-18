const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR, 'node_modules'];
module.exports = {
  entry: ['whatwg-fetch', SRC_DIR + '/index.js'],
  output: {
    path: OUTPUT_DIR,
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
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        include: defaultInclude
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    //inline: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: OUTPUT_DIR,
    stats: {
      colors: true,
      chunks: false,
      children: false
    }
  }
};
