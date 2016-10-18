var express = require('express')
var apiUrl = process.env.API_URL || 'https://local.installthisapp.com'
// #############
// Canvas
// #############
var photoContestRouter = express.Router()
var photoContestCanvasId = 'app3'
var bodyParser = require('body-parser');
var canvasParser = bodyParser.urlencoded({ extended: true })
var fetch = require('isomorphic-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
photoContestRouter.get('/app3/favicon.ico', function(req, res) {
	res.sendStatus(200)
})
photoContestRouter.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
photoContestRouter.use('/static', express.static(__dirname + '/dist'))
photoContestRouter.post(`/${photoContestCanvasId}`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/canvasauth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, req.body, {
			canvas_id: photoContestCanvasId
		}))
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			apiUrl,
			module: 'photo_contest',
			canvasId: photoContestCanvasId,
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
photoContestRouter.get(`/${photoContestCanvasId}/:checksum*`, canvasParser, function(req, res) {
	fetch(`${apiUrl}/standalone_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			canvas_id: photoContestCanvasId,
			checksum: req.params.checksum,
		})
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			apiUrl,
			module: 'photo_contest',
			canvasId: photoContestCanvasId,
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

module.exports = photoContestRouter