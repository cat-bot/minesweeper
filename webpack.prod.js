const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = function() {
  let appTarget = "prod";

  return merge(common, {
      mode: 'production',
      output: {
        // pack to deployment folder 
        path: path.resolve(__dirname, 'deploy/js'),
        clean: true
      },
      plugins: [
        // replace the apputil with a dummy one in production
        new webpack.NormalModuleReplacementPlugin(
          /(.*)-APPTARGET(\.*)/,
          function (resource) { resource.request = resource.request.replace(/-APPTARGET/, `-${appTarget}` ); }
        ),
      ]
  });
};
