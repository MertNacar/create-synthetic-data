const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env",
              "@babel/preset-react"],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }, {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
    ]
  },
  node: { fs: 'empty' },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin([
      { from: './public/assets', to: 'assets' },
    ]),
  ],
  performance: {
    hints: false
  }
};

module.exports = webpack;