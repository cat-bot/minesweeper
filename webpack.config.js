const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// this is the 'dev' config. just left named as-id so that it can be run with just 'webpack'
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map'
});