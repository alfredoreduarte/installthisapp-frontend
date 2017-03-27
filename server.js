var path = require('path')
var express = require('express')
var helmet = require('helmet')
var aws = require('aws-sdk')
var jsonfile = require('jsonfile')
var cors = require('cors')

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
else {
	app.use('/static', cors(), express.static(__dirname + '/dist', {
		maxAge: 600000,
	}))
}

// Images and other static asssets
app.use('/images', express.static(__dirname + '/assets/images'))
app.use('/styles', express.static(__dirname + '/assets/styles'))
app.use('/landing', express.static(__dirname + '/assets/landing'))
app.use('/public', express.static(__dirname + '/assets/newlanding'))
app.use('/sw.js', express.static(__dirname + '/assets/newlanding/sw.js'))
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

// Memory Match
var memoryMatchRouter = require('./canvas/memory_match/server.js')
app.use(memoryMatchRouter)

// Serving static HTML
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
app.get('/', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('index', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/top-fans-for-facebook-pages.html', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	const isOldUser = req.query.segment == 'old_users'
	res.render('app', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
		isOldUser,
	})
})
app.get('/trivia-contest.html', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	const isOldUser = req.query.segment == 'old_users'
	res.render('trivia', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
		isOldUser,
	})
})
app.get('/photo-contest.html', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	const isOldUser = req.query.segment == 'old_users'
	res.render('photo-contest', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
		isOldUser,
	})
})
app.get('/contact', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('contact', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/signup', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('register', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/login', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('login', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/card', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('card', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/forgot', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('request-recovery', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/forgot/sent', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('recovery-email-sent', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/reset-password', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('reset-password', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		clientId: req.query.client_id,
		uid: req.query.uid,
		token: req.query.token,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
app.get('/pricing', function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['landing']['js']
	const cssBundle = manifest['landing']['css']
	const vendorBundle = manifest['common']['js']
	res.render('pricing', {
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		clientId: req.query.client_id,
		uid: req.query.uid,
		token: req.query.token,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
	})
})
// 
// Renders the dashboard view. I.e. the main app.
// The 'alias' variable sets the id of the client to be impersonated,
// which in turn gets passed form the admin users list with a GET param
// defined as ALIAS_PARAM_KEY env variable.
// 
app.get('/d*', function(req, res){
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['dashboard']['js']
	const cssBundle = manifest['dashboard']['css']
	const vendorBundle = manifest['common']['js']
	res.render('dashboard', {
		alias: req.query[process.env.ALIAS_PARAM_KEY],
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		stripeKey: process.env.STRIPE_KEY,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
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
			url: `https://${process.env.CLOUDFRONT_DOMAIN}/${fileName}`
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