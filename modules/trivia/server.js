var express = require('express')
// var serverConfig = require('../../server.config')
// var facebookAppId = serverConfig.getFacebookAppId()
// var apiUrl = serverConfig.getApiUrl()
// var facebookAppId = process.env.FB_APP_ID || '1061199640593119'
var apiUrl = process.env.API_URL || 'https://local.installthisapp.com'
// #############
// Canvas
// #############
var triviaRouter = express.Router()
var triviaSubdomain = 'app1-localui'
var triviaCanvasId = 'app1'
// app.use(subdomain(triviaSubdomain, triviaRouter))
var bodyParser = require('body-parser');
var canvasParser = bodyParser.urlencoded({ extended: true })
var fetch = require('isomorphic-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
triviaRouter.get('/app1/favicon.ico', function(req, res) {
	res.sendStatus(200)
})
triviaRouter.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
triviaRouter.use('/static', express.static(__dirname + '/dist'))
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
			apiUrl,
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
triviaRouter.get(`/${triviaCanvasId}/:checksum*`, canvasParser, function(req, res) {
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
			apiUrl,
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

module.exports = triviaRouter