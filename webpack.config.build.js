
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
      { test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader,  'css-loader', 'sass-loader'],
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
		},
    {
			test: /\.(ts|tsx)?$/,
			exclude: /\.test.tsx?$/,
			use: {
				loader: 'ts-loader'
			},
			exclude: /node_modules/
		}]
	},
  	resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	devtool: 'source-map',
	plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
}