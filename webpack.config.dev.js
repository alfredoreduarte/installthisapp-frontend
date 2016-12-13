var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		dashboard: ['webpack-hot-middleware/client', './index'],
		landing: ['webpack-hot-middleware/client', './assets/landing/index'],
		// landing_styles: './assets/newlanding/styles.sass',
		// dashboard_styles: './assets/styles/styles.sass',
		trivia: './canvas/trivia/index',
		top_fans: './canvas/top_fans/index',
		photo_contest: './canvas/photo_contest/index',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		// new ExtractTextPlugin("assets/styles/styles.sass"),
		// new ExtractTextPlugin("dashboard_styles.css"),
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID),
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
		})
	],
	resolve: {
		root: [ __dirname + '/' ],
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			// json
			{
				test: /\.json$/,
				loaders: [ 'file' ],
				exclude: /node_modules/,
				include: __dirname
			},
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				exclude: /node_modules/,
				include: __dirname
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
				// loader: ExtractTextPlugin.extract("style", "css!sass")
			},
			// css
			{
				test: /\.(css)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style', 'css']
				// loader: ExtractTextPlugin.extract("style", "css")
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file'
			}
		]
	}
}