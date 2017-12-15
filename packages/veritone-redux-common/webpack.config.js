const path = require('path');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: { 'veritone-redux-common': path.join(__dirname, './src/index.js') },
  output: {
    filename: 'dist/bundle.js',
    libraryTarget: 'umd',
    library: 'veritone-redux-common',
    umdNamedDefine: true
  },
  externals: {
    redux: {
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-redux': {
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux'
    }
  },
  resolve: {
    alias: {
      helpers: path.join(__dirname, 'src/helpers'),
      modules: path.join(__dirname, 'src/modules'),
      util: path.join(__dirname, 'src/util')
    }
  },
  // plugins: [
  //   new MinifyPlugin()
  // ],
  module: {
    // noParse: [],
    rules: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        loader: 'babel-loader'
      }
    ]
  }
};
