
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	
  entry: {
    index: './index.js',
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
	  },
	
	mode: 'development', //development production
	module:{
		rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react" /*,{ "targets": { "node": "current" } }*/]
				}
			}
		}]
	},
	//watch: true,
	devtool: 'source-map',
	devServer:{
		contentBase: path.join(__dirname, 'dev'), //изменения
		//hot: true,
		host: 'localhost',
		open: 'chrome',
		openPage: 'index.html',
		port: 8080
	},

}