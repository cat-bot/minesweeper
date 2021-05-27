const path = require('path');

module.exports = {
    entry:'./src/js/coreapp/navigation.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'js'),
      clean: true
    }
};
