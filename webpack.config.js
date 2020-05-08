var glob = require('glob');
var path = require('path');

module.exports = {
    entry:  glob.sync('./src/**/*.js'),
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "script-loader"
          }
        },
      ]
    }
  };