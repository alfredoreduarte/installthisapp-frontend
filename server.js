var path = require('path')
var express = require('express')
var cors = require('express-cors')
var subdomain = require('express-subdomain')
var webpack = require('webpack')
var config = require('./webpack.config.dev')

var FACEBOOK_APP_ID = '1061199640593119'

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

// Mock Rails Api
app.get('/admin', function(req, res){
	res.json(require('./data/admin'))
})
app.get('/entities', function(req, res){
	res.json(require('./data/entities'))
})
app.post('/apps/create', function(req, res){
	res.json(require('./data/apps.create'))
})
app.get('/apps/styles/:checksum', function(req, res){
	res.sendFile(path.join(__dirname, 'assets/styles/module.css'))
})
// ======================
// Trivia
// ======================
// Backend
app.get('/entities.trivia', function(req, res){
	res.json(require('./data/entities.trivia'))
})
app.post('/trivia/questions/delete', function(req, res){
	res.json({status: 'ok'})
})
app.post('/trivia/questions/create', function(req, res){
	res.json(require('./data/questions.create'))
})
// Canvas
var triviaRouter = express.Router()
triviaRouter.get('/', function(req, res) {
	res.render('canvas', {
		module: 'trivia',
		checksum: req.query.checksum,
		FACEBOOK_APP_ID: '1525778314395413',
	})
});
var bodyParser = require('body-parser');
var canvasParser = bodyParser.urlencoded({ extended: true })
var fetch = require('isomorphic-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
triviaRouter.post('/', canvasParser, function(req, res) {
	fetch('https://local.installthisapp.com/test_auth.json', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(req.body)
	})
	.then(response => response.json())
	.then(json =>{
		console.log('api response:', json)
		// res.json(json)
		res.render('canvas', {
			module: 'trivia',
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
});
app.use(subdomain('app1-localui', triviaRouter))
triviaRouter.get('/entities.trivia.canvas', function(req, res){
	res.json(require('./data/entities.trivia.canvas'))
})


// ======================
// Top Fans
// ======================
// Canvas subdomain
var topFansRouter = express.Router()
topFansRouter.get('/', function(req, res) {
	res.render('canvas', {
		module: 'topFans',
	})
});
app.use(subdomain('app2', topFansRouter));

// Serving static HTML
app.get('/landing', function(req, res) {
	res.render('landing', {
		FACEBOOK_APP_ID: FACEBOOK_APP_ID
	})
});
app.get('/*', function(req, res){
	// res.sendFile(path.join(__dirname, 'index.html'))
	res.render('dashboard', {
		FACEBOOK_APP_ID: FACEBOOK_APP_ID
	})
})

var fs = require('fs'),
    http = require('http'),
    https = require('https');
var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/STAR_installthisapp_com.crt'),
};

// Running the server
// app.listen(process.env.PORT, function(err){
var server = https.createServer(options, app).listen(process.env.PORT, function(err){
	if (err) {
		console.log(err)
		return;
	}
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})