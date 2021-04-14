
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	
	entry: {
    index: './src/index.js',
    stgrid: './src/stgridIndex.js',
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
	  },
	
  mode: 'development', //development

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
					presets: ["@babel/preset-env", "@babel/preset-react" /*,{ "targets": { "node": "current" } }*/]
				}
			}
		},
		{
			test: /\.(ts|tsx)?$/,
			use: {
				loader: 'ts-loader'
			},
			exclude: /node_modules/
		}]
		
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	//watch: true,
	devtool: 'source-map',
	devServer:{
		contentBase: path.join(__dirname, 'dev'), //изменения
		//hot: true,
		host: 'localhost',
		open: 'chrome',
		openPage: 'stgrid.html',
		port: 8080
	},
	plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
}