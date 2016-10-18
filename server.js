var path = require('path')
var express = require('express')
var helmet = require('helmet')

const app = express()
app.set('view engine', 'ejs')

var express_enforces_ssl = require('express-enforces-ssl');
app.enable('trust proxy');
app.use(express_enforces_ssl());

// 
// Force SSL
// 
// const ninetyDaysInMilliseconds = 7776000000
const ninetyDaysInMilliseconds = 10886400
app.use(helmet.hsts({
	maxAge: ninetyDaysInMilliseconds,
	includeSubdomains: true,
	preload: true,
	force: true,
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
	console.log('elrecu')
	console.log(req.get('host'))
	console.log(process.env)
	res.render('landing', {
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/signup', function(req, res) {
	res.render('register', {
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/login', function(req, res) {
	res.render('login', {
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/forgot', function(req, res) {
	res.render('request-recovery', {
		apiUrl: process.env.API_URL
	})
})
app.get('/reset-password', function(req, res) {
	res.render('reset-password', {
		apiUrl: process.env.API_URL,
		clientId: req.query.client_id,
		uid: req.query.uid,
		token: req.query.token,
	})
})
app.get('/d*', function(req, res){
	res.render('dashboard', {
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})

// Running the server
if (process.env.NODE_ENV == 'development') {
// if (false) {
	var options = {}
	var fs = require('fs'),
		https = require('https')
	var options = {
		key: fs.readFileSync('./ssl-dev/server.key'),
		cert: fs.readFileSync('./ssl-dev/server.crt'),
	}
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