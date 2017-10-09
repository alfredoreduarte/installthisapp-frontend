var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({
	prettyPrint: true,
})

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		common: 'moment',
		dashboard: ['webpack-hot-middleware/client', './index'],
		leadgen: ['webpack-hot-middleware/client', './leadgen/index'],
		publiclogin: ['webpack-hot-middleware/client', './publiclogin/index'],
		landing: ['webpack-hot-middleware/client', './assets/landing/index'],
		// "campaign-one": ['webpack-hot-middleware/client', './assets/campaign/one'],
		// "campaign-two": ['webpack-hot-middleware/client', './assets/campaign/two'],
		// "campaign-three": ['webpack-hot-middleware/client', './assets/campaign/three'],
		// "campaign-four": ['webpack-hot-middleware/client', './assets/campaign/four'],
		// "campaign-five": ['webpack-hot-middleware/client', './assets/campaign/five'],
		trivia: './canvas/trivia/index',
		top_fans: './canvas/top_fans/index',
		photo_contest: './canvas/photo_contest/index',
		memory_match: './canvas/memory_match/index',
		catalog: './canvas/catalog/index',
		form: './canvas/form/index',
		fan_gate: './canvas/fan_gate/index',
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/static/'
	},
	plugins: [
		assetsPluginInstance,
		new ExtractTextPlugin('[name].css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID),
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
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
				loaders: ['file-loader']
			},
			// sass
			{
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
			// css
			{
				test: /\.(css)$/,
				loader: ExtractTextPlugin.extract('css-loader')
			},
			// fonts
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loaders: ['file-loader']
			}
		]
	}
}