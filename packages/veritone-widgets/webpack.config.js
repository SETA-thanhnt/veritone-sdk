const path = require('path');

module.exports = {
  entry: { 'veritone-widgets': path.join(__dirname, 'src/build-entry.js') },
  output: {
    filename: 'dist/bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      // helpers: path.join(__dirname, 'src/helpers'),
      // components: path.join(__dirname, 'src/components'),
      // images: path.join(__dirname, 'src/resources/images'),
    }
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
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    },
    'react-redux': {
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux'
    },
    'veritone-redux-common': {
      commonjs: 'veritone-redux-common',
      commonjs2: 'veritone-redux-common',
      amd: 'veritone-redux-common'
    },
    'veritone-react-common': {
      commonjs: 'veritone-react-common',
      commonjs2: 'veritone-react-common',
      amd: 'veritone-react-common'
    }
  },
  module: {
    // noParse: [],
    rules: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        include: path.resolve('./src'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
        include: path.resolve('./src')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  }
};
