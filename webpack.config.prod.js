var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	devtool: 'source-map',
	entry: {
		dashboard: 'index.js',
		landing: './assets/landing/index',
		// landing_styles: './assets/newlanding/styles.sass',
		trivia: 'canvas/trivia/index.js',
		top_fans: 'canvas/top_fans/index.js',
		photo_contest: 'canvas/photo_contest/index.js',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		// new ExtractTextPlugin("landing_styles.css"),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID || '1061199640593119'),
			'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://local.installthisapp.com'),
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	],
	resolve: {
		root: [ __dirname + '/' ],
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: __dirname,
				query: {
					presets: ['es2015', 'react']
				}
			},
			// images
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['file']
			},
			// sass
			{
				test: /\.(sass|scss)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style', 'css', 'sass']
				// loader: ExtractTextPlugin.extract("style", "css?minimize!sass")
			},
			// css
			{
				test: /\.(css)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style', 'css']
				// loader: ExtractTextPlugin.extract("style", "css?minimize!")
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file'
			}
		]
	}
}