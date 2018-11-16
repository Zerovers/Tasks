const path = require('path');

module.exports = {
  entry: './youtube-client/index.js',
  output: {
    path: path.join(__dirname, './youtube-client/dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  mode: 'development',
};
