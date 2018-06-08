var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './_index.js',

  output: {
    filename: 'index.js',
    path: __dirname
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react' }
    ]
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-calc'),
    require('postcss-color-function'),
    require('postcss-custom-properties'),
    require('postcss-custom-media')
  ],

  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: '_index.html',
      xhtml: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    })
  ]
}
