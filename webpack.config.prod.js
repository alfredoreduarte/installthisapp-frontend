var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./client/app.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	resolve: {
		root: [ __dirname + '/' ],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			// js
			{
				test: /\.(jsx|js)$/,
				loaders: ['babel'],
				include: path.join(__dirname, 'client')
			},
			// css
			{
				test: /\.(css|sass|scss)$/,
				include: path.join(__dirname, 'client/assets/styles'),
				loaders: ['style', 'css', 'sass']
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file'
			}
		]
	}
}