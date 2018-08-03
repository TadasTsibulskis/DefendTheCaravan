const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {

  return {
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app/js/app.[hash].js',
      publicPath: '/',
    },
    devtool: 'source-map',
    context: __dirname,
    module: {
      rules: [
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'app')
      ],
      extensions: ['.js', '.json', '.css'],
      alias: {
        controllers: path.resolve(__dirname, 'app/src/controllers'),
        constants: path.resolve(__dirname, 'app/src/constants'),
        utils: path.resolve(__dirname, 'app/src/utils')
      }
    },
    devServer: {
      publicPath: '/',
      contentBase: path.join(__dirname, 'app/assets'),
      compress: true,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './app/index.html'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'app/assets/',
          to: 'app/assets/'
        }
      ])
    ],
  };
};
