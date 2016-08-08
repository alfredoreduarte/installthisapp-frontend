var path = require('path')
var express = require('express')
var cors = require('express-cors')
var subdomain = require('express-subdomain')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
// Config
switch (process.env.NODE_ENV){
	case 'development':
		var facebookAppId = '1061199640593119'
		var apiUrl = 'https://local.installthisapp.com'
	case 'production':
		var facebookAppId = '1075605565855278'
		var apiUrl = 'https://stage.installthisapp.com'
	default:
		var facebookAppId = '1061199640593119'
		var apiUrl = 'https://local.installthisapp.com'
}
// Config

// var facebookAppId = '1061199640593119'
// var apiUrl = 'https://local.installthisapp.com'
// var facebookAppId = '1075605565855278'
// var apiUrl = 'https://stage.installthisapp.com'

process.env.PORT = process.env.PORT || 4000;
process.env.HOST = process.env.HOST || 'localhost';

const app = express()
app.set('view engine', 'ejs')
app.use(cors({
	allowedOrigins: [
		'*.installthisapp.local:*',
	]
}))
const compiler = webpack(config)

const isDeveloping = process.env.NODE_ENV !== 'production'

// Hot Module Reloading
if (isDeveloping) {
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(require('webpack-hot-middleware')(compiler))
}
else{
	app.use('/static',  express.static(__dirname + '/dist'))
}

// Images and other static asssets
app.use('/images',  express.static(__dirname + '/assets/images'))
app.use('/styles',  express.static(__dirname + '/assets/styles'))
app.use('/node_modules',  express.static(__dirname + '/node_modules'))

// ======================
// Trivia
// ======================
// #############
// Canvas
// #############
var triviaRouter = express.Router()
var triviaSubdomain = 'app1-localui'
var triviaCanvasId = 'app1'
// app.use(subdomain(triviaSubdomain, triviaRouter))
app.use(triviaRouter)
var bodyParser = require('body-parser');
var canvasParser = bodyParser.urlencoded({ extended: true })
var fetch = require('isomorphic-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
triviaRouter.get('/app1/favicon.ico', function(req, res) {
	res.sendStatus(200)
})
triviaRouter.post(`/${triviaCanvasId}`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/test_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, req.body, {
			canvas_id: triviaCanvasId
		}))
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			module: 'trivia',
			canvasId: triviaCanvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
		})
	})
	.catch(exception =>
		{
			console.log('postNewApp: parsing failed', exception)
			res.json({'error': exception})
		}
	)
})
triviaRouter.get(`/${triviaCanvasId}/(:checksum)`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/standalone_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			canvas_id: triviaCanvasId,
			checksum: req.params.checksum,
		})
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			module: 'trivia',
			canvasId: triviaCanvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
		})
	})
	.catch(exception =>
		{
			console.log('postNewApp: parsing failed', exception)
			res.json({'error': exception})
		}
	)
})

// Serving static HTML
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