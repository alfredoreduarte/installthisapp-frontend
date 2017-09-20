var express = require('express')
var jsonfile = require('jsonfile')
var apiUrl = process.env.API_URL
var bodyParser = require('body-parser')
var fetch = require('isomorphic-fetch')
var moduleName = 'photo_contest'
var canvasId = 'app3'
// #############
// Canvas
// #############
var cloudFrontUrl = process.env.CLOUDFRONT_URL
var canvasRouter = express.Router()
// For canvas apps on subdomains
// var canvasSubdomain = `${canvasId}-localui`
// app.use(subdomain(canvasSubdomain, canvasRouter))
var canvasParser = bodyParser.urlencoded({ extended: true })
// canvasRouter.get(`/${canvasId}/favicon.ico`, function(req, res) {
canvasRouter.get(`/${moduleName}/favicon.ico`, function(req, res) {
	res.sendStatus(200)
})
canvasRouter.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
canvasRouter.use('/static', express.static(__dirname + '/dist'))
// 
// Auth from facebook page tab
// 
canvasRouter.post(`/${canvasId}`, canvasParser, function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const vendorBundle = manifest['common']['js']
	const moduleBundle = manifest[moduleName]['js']
	fetch(`${apiUrl}/canvasauth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({}, req.body, {
			canvas_id: canvasId
		}))
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			cloudFrontUrl: cloudFrontUrl,
			apiUrl,
			module: moduleName,
			canvasId: canvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
			imagesUrl: json.images_url,
			manifestBundle,
			vendorBundle,
			moduleBundle,
		})
	})
	.catch(exception =>
		{
			console.log('Parsing failed', exception)
			res.json({'error': exception})
		}
	)
})
// canvasRouter.get(`/${canvasId}/:checksum*`, canvasParser, function(req, res) {
canvasRouter.get(`/${moduleName}/:checksum*`, canvasParser, function(req, res) {
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const vendorBundle = manifest['common']['js']
	const moduleBundle = manifest[moduleName]['js']
	fetch(`${apiUrl}/standalone_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			// canvas_id: canvasId,
			checksum: req.params.checksum,
		})
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', {
			cloudFrontUrl: cloudFrontUrl,
			apiUrl,
			module: moduleName,
			canvasId: canvasId,
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
			imagesUrl: json.images_url,
			manifestBundle,
			vendorBundle,
			moduleBundle,
		})
	})
	.catch(exception =>
		{
			console.log('Parsing failed', exception)
			res.json({'error': exception})
		}
	)
})

module.exports = canvasRouter