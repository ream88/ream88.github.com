var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

var path = require('path');
var ejs = require('ejs');
var fs = require('fs');


module.exports = {
  entry: './index.js',

  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?stage=0&loose[]=es6.modules&loose[]=es6.classes' }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-calc'),
    require('postcss-custom-properties')
  ],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new ReactToHtmlPlugin('index.html', 'bundle.js', {
      template: ejs.compile(fs.readFileSync(__dirname + '/index.ejs', 'utf-8'))
    })
  ]
};
