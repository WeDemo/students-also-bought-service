const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: { extensions: ['.js', '.jsx'] },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
