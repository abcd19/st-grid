
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	
	entry: {
    index: './src/index.js',
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
	  },
	
  mode: 'production',
  externals:[
    "react-dom",
    "react"
  ],
	module:{
		rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
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
					presets: ["@babel/preset-env", "@babel/preset-react"]
				}
			}
		}]
	},
	devtool: 'source-map',
	plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
}