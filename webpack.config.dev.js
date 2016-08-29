var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		dashboard: ['webpack-hot-middleware/client', './index'],
		trivia: './canvas/trivia/index',
		top_fans: './canvas/top_fans/index',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID || '1061199640593119'),
			'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://local.installthisapp.com'),
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