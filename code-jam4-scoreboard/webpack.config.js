const path = require('path');
let webpack = require('webpack');
const createLodashAliases = require('lodash-loader').createLodashAliases;

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './'), 'node_modules']
  },
  mode: 'development',
};