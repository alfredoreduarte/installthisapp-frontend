var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: {
		modulo: './canvas/trivia/index'
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		// new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			// minimize: true,
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