const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./views/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.jsx'
  ],
  output: {
    filename: './bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'https://simple-react-nodejs-fullstack.appspot.com'),
      },
    })
  ]
};
