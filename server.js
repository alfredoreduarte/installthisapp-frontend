var path = require('path')
var express = require('express')
var forceSSL = require('express-force-ssl')
// var cors = require('express-cors')
var facebookAppId = process.env.FB_APP_ID
var apiUrl = process.env.API_URL

const app = express()
app.set('view engine', 'ejs')
// app.use(cors({
// 	allowedOrigins: [
// 		'*.installthisapp.local:*',
// 	]
// }))
app.use(forceSSL)

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
var triviaRouter = require('./canvas/trivia/server.js')
app.use(triviaRouter)

// Top Fans
var topFansRouter = require('./canvas/top_fans/server.js')
app.use(topFansRouter)

// Photo Contest
var photoContestRouter = require('./canvas/photo_contest/server.js')
app.use(photoContestRouter)

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
})
app.get('/d*', function(req, res){
	res.render('dashboard', {
		apiUrl,
		facebookAppId,
	})
})

var options = {}
if (process.env.NODE_ENV == 'development') {
	var fs = require('fs'),
		http = require('http'),
		https = require('https')
	var options = {
		key: fs.readFileSync('./ssl-dev/server.key'),
		cert: fs.readFileSync('./ssl-dev/server.crt'),
	}
}

// Running the server
if (process.env.NODE_ENV == 'development') {
	var server = https.createServer(options, app).listen(process.env.PORT, function(err){
		if (err) {
			console.log(err)
			return
		}
		console.log("Express server listening on port %d in %s mode.", this.address().port, app.settings.env)
	})
}
else{
	app.listen(process.env.PORT, function(err){
		if (err) {
			console.log(err)
			return
		}
		console.log("Express server listening on port %d in %s mode.", this.address().port, app.settings.env)
	})	
}