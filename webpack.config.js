/*eslint-env node*/

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ReactToHtmlPlugin = require("react-to-html-webpack-plugin");

var ejs = require("ejs");
var fs = require("fs");


module.exports = {
  entry: "./components/Terminal/index.js",

  output: {
    path: __dirname,
    filename: "index.js",
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader") },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?stage=0&loose[]=es6.modules&loose[]=es6.classes" }
    ]
  },

  postcss: [
    require("autoprefixer-core"),
    require("postcss-calc"),
    require("postcss-color-function"),
    require("postcss-custom-properties"),
    require("postcss-custom-media")
  ],

  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new ReactToHtmlPlugin("index.html", "index.js", {
      template: ejs.compile(fs.readFileSync(__dirname + "/index.ejs", "utf-8"))
    })
  ]
};
