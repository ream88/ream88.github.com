const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './_index.js',

  output: {
    filename: 'index.js',
    path: __dirname
  },

  module: {
    rules: [
      { test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
                require('postcss-calc'),
                require('postcss-color-function'),
                require('postcss-custom-properties'),
                require('postcss-custom-media')
              ]
            }
          }
        ]
      },
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      template: '_index.html',
      xhtml: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    })
  ]
}
