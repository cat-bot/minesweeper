const path = require('path');

module.exports = {
    entry:'./src/js/nav.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'js'),
    }
}