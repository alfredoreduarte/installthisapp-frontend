var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({
	prettyPrint: true,
})

module.exports = {
	devtool: 'source-map',
	entry: {
		common: 'moment',
		dashboard: 'index.js',
		leadgen: ['webpack-hot-middleware/client', './leadgen/index'],
		landing: './assets/landing/index',
		"campaign-one": './assets/campaign/one',
		"campaign-two": './assets/campaign/two',
		"campaign-three": './assets/campaign/three',
		"campaign-four": './assets/campaign/four',
		"campaign-five": './assets/campaign/five',
		trivia: 'canvas/trivia/index.js',
		top_fans: 'canvas/top_fans/index.js',
		photo_contest: 'canvas/photo_contest/index.js',
		memory_match: 'canvas/memory_match/index',
		catalog: 'canvas/catalog/index',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[hash].[name].js',
		chunkFilename: '[chunkhash].[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		assetsPluginInstance,
		new ExtractTextPlugin('[hash].[name].css'),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID),
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true,
			compress: {
				warnings: true,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['common', 'manifest']
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	resolve: {
		modules: [__dirname, 'node_modules'],
		extensions: ['.js', '.json', '.sass']
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
				loaders: ['file-loader']
			},
			// sass
			{
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract('css-loader?minimize!sass-loader')
            },
			// css
			{
				test: /\.(css)$/,
				loader: ExtractTextPlugin.extract('css-loader')
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file-loader'
			}
		]
	}
}