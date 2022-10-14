const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'whepvideo.component',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'whep-video.component.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: package.version,
      template: './demo/index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    // disable dynamic imports, it doesn't work with the umd output
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 1337,
    host: '0.0.0.0',
  },
  stats: {
    warningsFilter: [/Failed to parse source map/],
  }
};
