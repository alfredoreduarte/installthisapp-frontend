var path = require('path')
var express = require('express')
var cors = require('express-cors')
var subdomain = require('express-subdomain')
var serverConfig = require('./server.config')

var facebookAppId = serverConfig.getFacebookAppId()
var apiUrl = serverConfig.getApiUrl()

process.env.PORT = process.env.PORT || 4000
process.env.HOST = process.env.HOST || 'localhost'

const app = express()
app.set('view engine', 'ejs')
app.use(cors({
	allowedOrigins: [
		'*.installthisapp.local:*',
	]
}))

const isDeveloping = process.env.NODE_ENV !== 'production'

// Hot Module Reloading
if (isDeveloping) {
	var webpack = require('webpack')
	var config = require('./webpack.config.dev')
	var DashboardPlugin = require('webpack-dashboard/plugin')
	const compiler = webpack(config)
	compiler.apply(new DashboardPlugin())
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}))
	app.use(require('webpack-hot-middleware')(compiler))
}
else{
	app.use('/static', express.static(__dirname + '/dist'))
}

// Images and other static asssets
app.use('/images', express.static(__dirname + '/assets/images'))
app.use('/styles', express.static(__dirname + '/assets/styles'))
app.use('/landing', express.static(__dirname + '/assets/landing'))
app.use('/canvas', express.static(__dirname + '/assets/canvas'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Trivia
var triviaRouter = require('./modules/trivia/server.js');
app.use(triviaRouter)

// Top Fans
var topFansRouter = require('./modules/top_fans/server.js');
app.use(topFansRouter)

// Serving static HTML
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
app.get('/', function(req, res) {
	res.render('landing', {
		apiUrl,
		facebookAppId,
	})
});
app.get('/d*', function(req, res){
	res.render('dashboard', {
		facebookAppId: facebookAppId
	})
})

var options = {}
if (process.env.NODE_ENV == 'development') {
	var fs = require('fs'),
		http = require('http'),
		https = require('https');
	var options = {
		key: fs.readFileSync('./ssl/server.key'),
		cert: fs.readFileSync('./ssl/STAR_installthisapp_com.crt'),
	}
}

// Running the server
// Config
if (process.env.NODE_ENV == 'development') {
	var server = https.createServer(options, app).listen(process.env.PORT, function(err){
		if (err) {
			console.log(err)
			return;
		}
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	})
}
else{
	app.listen(process.env.PORT, function(err){
		if (err) {
			console.log(err)
			return;
		}
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	})	
}