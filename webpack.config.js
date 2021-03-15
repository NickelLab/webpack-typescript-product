const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  mode: process.env.NODE_ENV,
  target: process.env.NODE_ENV === 'production' ? 'browserslist' : 'web',
  entry: './src/index.ts',

  output: {
    path: __dirname + '/dist',
    filename: 'app.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    // 拡張子を配列で指定
    extensions: ['.ts', '.js'],
    alias: {
      '@': __dirname + '/src',
    },
  },
  devServer: {
    contentBase: __dirname + '/dist',
    port: 8000,
    hot: true,
    writeToDisk: true,
    watchContentBase: true,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
        },
      ],
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      test: /\.(png)$/i,
      pngquant: {
        quality: '65-80',
      },
    }),
  ],
}
