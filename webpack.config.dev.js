var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		root: [ __dirname + '/' ],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				exclude: /node_modules/,
				include: __dirname
			},
			// sass
			{
				test: /\.(sass|scss)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style', 'css', 'sass']
			},
			// css
			{
				test: /\.(css)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style', 'css']
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file'
			}
		]
	}
}