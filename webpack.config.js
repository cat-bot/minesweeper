const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// this is the 'dev' config. just left named as-id so that it can be run with just 'webpack'
module.exports = function() {
  let appTarget = "dev";
  
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      // replace the apputil with a dummy one in production
      new webpack.NormalModuleReplacementPlugin(
        /(.*)-APPTARGET(\.*)/,
        function (resource) {
          resource.request = resource.request.replace(/-APPTARGET/, `-${appTarget}` );
        }
      ),
    ]
  });
};