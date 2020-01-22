const path = require('path');
const extractCss = require('mini-css-extract-plugin');

const inputPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: inputPath,
  entry: {
    'main': './index.tsx',
    'serviceWorker': './serviceWorker.js'
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    contentBase: outputPath,
    watchContentBase: true,
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: extractCss.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new extractCss(
      {
        filename: '[name].css',
        chunkFilename: '[id].css'
      }
    )
  ]
};
