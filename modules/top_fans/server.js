var express = require('express')
var apiUrl = process.env.API_URL || 'https://local.installthisapp.com'
// #############
// Canvas
// #############
var topFansRouter = express.Router()
var topFansSubdomain = 'app2-localui'
var topFansCanvasId = 'app2'
// app.use(subdomain(topFansSubdomain, topFansRouter))
var bodyParser = require('body-parser');
var canvasParser = bodyParser.urlencoded({ extended: true })
var fetch = require('isomorphic-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
topFansRouter.get('/app2/favicon.ico', function(req, res) {
	res.sendStatus(200)
})
topFansRouter.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
topFansRouter.use('/static', express.static(__dirname + '/dist'))
topFansRouter.post(`/${topFansCanvasId}`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/test_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, req.body, {
			canvas_id: topFansCanvasId
		}))
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			apiUrl,
			module: 'top_fans',
			canvasId: topFansCanvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
		})
	})
	.catch(exception =>
		{
			console.log('postNewApp: parsing failed', exception)
			res.json({'error': exception})
		}
	)
})
topFansRouter.get(`/${topFansCanvasId}/:checksum*`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/standalone_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			canvas_id: topFansCanvasId,
			checksum: req.params.checksum,
		})
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			apiUrl,
			module: 'top_fans',
			canvasId: topFansCanvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
		})
	})
	.catch(exception =>
		{
			console.log('postNewApp: parsing failed', exception)
			res.json({'error': exception})
		}
	)
})

module.exports = topFansRouter