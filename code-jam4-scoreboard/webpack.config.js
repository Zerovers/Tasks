const path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
const createLodashAliases = require('lodash-loader').createLodashAliases;

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader!lodash-loader" }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    })
  ],
  resolve: {
    alias: createLodashAliases(),
    modules: [path.resolve(__dirname, './'), 'node_modules']
  },
  mode: 'development',
};