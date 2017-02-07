var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({
	prettyPrint: true,
})

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		common: 'moment',
		dashboard: ['webpack-hot-middleware/client', './index'],
		landing: ['webpack-hot-middleware/client', './assets/landing/index'],
		trivia: './canvas/trivia/index',
		top_fans: './canvas/top_fans/index',
		photo_contest: './canvas/photo_contest/index',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[hash].[name].js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		assetsPluginInstance,
		new ExtractTextPlugin('[hash].[name].css'),
		// new ExtractTextPlugin("assets/styles/styles.sass"),
		// new ExtractTextPlugin("dashboard_styles.css"),
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID),
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
		}),
		new webpack.optimize.CommonsChunkPlugin({
			// minChunks: Infinity,
			names: ['common', 'manifest'] // Specify the common bundle's name.
		})
	],
	resolve: {
		// root: [ __dirname + '/' ],
		modules: [__dirname, "node_modules"],
		extensions: ['.js', '.json', '.sass']
	},
	module: {
		loaders: [
			// json
			{
				test: /\.json$/,
				loaders: [ 'file-loader' ],
				exclude: /node_modules/,
				include: __dirname
			},
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel-loader' ],
				exclude: /node_modules/,
				include: __dirname
			},
			// images
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['file-loader']
			},
			// sass
			// {
			// 	test: /\.(sass|scss)$/,
			// 	// include: path.join(__dirname, 'assets/styles'),
			// 	loaders: ['style', 'css', 'sass']
			// 	// loader: ExtractTextPlugin.extract("style", "css!sass")
			// },
			// newsass
			{
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
			// css
			{
				test: /\.(css)$/,
				// include: path.join(__dirname, 'assets/styles'),
				loaders: ['style-loader', 'css-loader']
				// loader: ExtractTextPlugin.extract("style", "css")
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file-loader'
			}
		]
	}
}