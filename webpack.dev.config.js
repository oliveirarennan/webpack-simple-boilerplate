const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DotenvWebpackPlugin = require("dotenv-webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src','app.js'),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'img/[name][ext]',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    index: 'index.html',
    port: 3000,
    writeToDisk: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: 'MyWebPack'
    }),
  ]
}
