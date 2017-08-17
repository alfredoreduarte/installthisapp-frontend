var path = require('path')
var express = require('express')
var map = require('express-sitemap')
var helmet = require('helmet')
var cors = require('cors')

const app = express()
app.set('view engine', 'ejs')

var express_enforces_ssl = require('express-enforces-ssl')
app.enable('trust proxy')
app.use(express_enforces_ssl())

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
app.use('/fonts', cors(), express.static(__dirname + '/assets/fonts'))
app.use('/styles', express.static(__dirname + '/assets/styles'))
app.use('/landing', express.static(__dirname + '/assets/landing'))
app.use('/public', express.static(__dirname + '/assets/newlanding'))
app.use('/googleaf3715fff09887cb.html', express.static(__dirname + '/public/googleaf3715fff09887cb.html'))
app.use('/sw.js', express.static(__dirname + '/assets/newlanding/sw.js'))
app.use('/canvas', express.static(__dirname + '/assets/canvas'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// 
// === Canvas ===
// 
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
// Catalog
var catalogRouter = require('./canvas/catalog/server.js')
app.use(catalogRouter)

// Serving static HTML
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})

// 
// === Landing & Dashboard ===
// 
var index = require('./public-routes/index')
var campaign = require('./public-routes/campaign')
var dashboard = require('./public-routes/dashboard')
var leadgen = require('./public-routes/leadgen')
app.get('/d*', dashboard)
app.get('/leadgen*', leadgen)
app.get('/campaign*', campaign)
app.get('/*', index)

// 
// === AWS Uploader ===
// 
var s3 = require('./s3')
app.get('/sign-s3', s3)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found')
// 	err.status = 404
// 	next(err)
// })

// error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get('env') === 'development' ? err : {}

// 	// render the error page
// 	res.status(err.status || 500)
// 	res.render('error')
// })

// 
// === Sitemap & robots.txt ===
// 
var rightNow = new Date()
var dateForSitemap = rightNow.toISOString().slice(0,10).replace(/-/g,"-")
const sitemap = map({
	http: 'https',
	url: 'v3.installthisapp.com',
	sitemap: 'sitemap.xml',
	robots: 'robots.txt',
	sitemapSubmission: '/sitemap.xml',
	route: {
		// 'ALL': {
		// 	lastmod: dateForSitemap,
		// 	changefreq: 'weekly',
		// 	// priority: 1.0,
		// },
		'/': {
			lastmod: dateForSitemap,
			changefreq: 'weekly',
			priority: 1.0,
		},
		'/top-fans': {
			lastmod: dateForSitemap,
			changefreq: 'weekly',
			priority: 1.0,
		},
		'/trivia': {
			lastmod: dateForSitemap,
			changefreq: 'weekly',
			priority: 1.0,
		},
		'/photo-contest': {
			lastmod: dateForSitemap,
			changefreq: 'weekly',
			priority: 1.0,
		},
		'/sign-s3': {
			disallow: true,
		},
		'/forgot/sent': {
			disallow: true,
		},
		'/card': {
			disallow: true,
		},
		'/d': {
			disallow: true,
		},
	},
})
sitemap.generate4(index)

// Robots.txt
app.get('/sitemap.xml', function(req, res) {
	sitemap.XMLtoWeb(res)
}).get('/robots.txt', function(req, res) {
	sitemap.TXTtoWeb(res)
})

// Running the server
if (process.env.NODE_ENV == 'development') {
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