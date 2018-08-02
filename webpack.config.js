const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {

  return {
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app/index'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/app.[hash].js',
      publicPath: '/',
    },
    devtool: 'source-map',
    context: __dirname,
    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|wav|mp3)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            publicPath: '/',
            outputPath: '',
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
      }
    },
    devServer: {
      publicPath: '/',
      contentBase: path.join(__dirname, 'assets'),
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
    ],
  };
};
