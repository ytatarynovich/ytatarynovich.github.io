var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // The standard entry point and output config
  entry: "./src/app.ts",
  output: {
    path: 'dist',
    filename: "app.js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
      new ExtractTextPlugin('app.css')
  ]
}