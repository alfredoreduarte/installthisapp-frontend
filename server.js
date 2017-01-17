var path = require('path')
var express = require('express')
var helmet = require('helmet')
var aws = require('aws-sdk')

const app = express()
app.set('view engine', 'ejs')

var express_enforces_ssl = require('express-enforces-ssl');
app.enable('trust proxy');
app.use(express_enforces_ssl());

var cloudFrontUrl = process.env.CLOUDFRONT_URL

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
	app.use('/static', express.static(__dirname + '/dist', {
		maxAge: 600000,
	}))
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
	res.render('index', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/top-fans-for-facebook-pages.html', function(req, res) {
	res.render('app', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/contact', function(req, res) {
	res.render('contact', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/signup', function(req, res) {
	res.render('register', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/login', function(req, res) {
	res.render('login', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/card', function(req, res) {
	res.render('card', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
	})
})
app.get('/forgot', function(req, res) {
	res.render('request-recovery', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL
	})
})
app.get('/forgot/sent', function(req, res) {
	res.render('recovery-email-sent', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL
	})
})
app.get('/reset-password', function(req, res) {
	res.render('reset-password', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		clientId: req.query.client_id,
		uid: req.query.uid,
		token: req.query.token,
	})
})
app.get('/pricing', function(req, res) {
	res.render('pricing', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		clientId: req.query.client_id,
		uid: req.query.uid,
		token: req.query.token,
	})
})
// 
// Renders the dashboard view. I.e. the main app.
// The 'alias' variable sets the id of the client to be impersonated,
// which in turn gets passed form the admin users list with a GET param
// defined as ALIAS_PARAM_KEY env variable.
// 
app.get('/d*', function(req, res){
	res.render('dashboard', {
		alias: req.query[process.env.ALIAS_PARAM_KEY],
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		stripeKey: process.env.STRIPE_KEY,
	})
})

// Direct uploads to S3 https://devcenter.heroku.com/articles/s3-upload-node
var S3_BUCKET = process.env.S3_BUCKET
app.get('/sign-s3', (req, res) => {
	const s3 = new aws.S3()
	const fileName = req.query['file-name']
	const fileType = req.query['file-type']
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	}

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err)
			return res.end()
		}
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
		}
		res.write(JSON.stringify(returnData))
		res.end()
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