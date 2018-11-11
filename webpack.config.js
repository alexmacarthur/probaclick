const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const pkg = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';

let plugins = [];

if(isProd) {
  plugins.push(new MinifyPlugin());
}

const banner = `
  ${pkg.name} - ${pkg.description}
  Author: ${pkg.author}
  Version: v${pkg.version}
  URL: ${pkg.homepage}
  License: ${pkg.license}
`;

plugins.push(new webpack.BannerPlugin({ banner }));

module.exports = {
  entry: {
    ProbaClick: './src/probaclick.js'
  },
  output: {
    path: __dirname + '/dist',
    library: 'ProbaClick',
    libraryTarget: 'umd',
    libraryExport: "default",
    filename: 'probaclick.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }
    ]
  },
  plugins
};