
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

var spritesPlugin = new SpriteLoaderPlugin();
var htmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
});
var cleanPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: ['es2015']
                      }
                  }
              ]
          },
          {
            test: /\.scss$/,
            use: extractPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
          },
          {
            test: /\.html$/,
            use: ['html-loader']
          },
          {
            test: /\.svg$/,
            use: ['svg-sprite-loader', 'svgo-loader']
          }
      ]
  },
  plugins: [
      extractPlugin,
      spritesPlugin,
      htmlPlugin,
      cleanPlugin
  ]
};