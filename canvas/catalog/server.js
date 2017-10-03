var moduleName = 'catalog'
var canvasId = 'app5'

var express = require('express')
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser')
var fetch = require('isomorphic-fetch')
var apiUrl = process.env.API_URL

if (process.env.NODE_ENV == 'development') {
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}
// #############
// Canvas
// #############
var cloudFrontUrl = process.env.CLOUDFRONT_URL
var canvasRouter = express.Router()
var canvasParser = bodyParser.urlencoded({ extended: true })
canvasRouter.get(`/${moduleName}/favicon.ico`, (req, res) => {
	res.sendStatus(200)
})

// Remove trailing slash from URL
canvasRouter.use((req, res, next) => {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1))
	else
		next()
})
canvasRouter.use('/static', express.static(__dirname + '/dist'))

// Manifest file
const manifestPath = `${process.cwd()}/webpack-assets.json`
const manifest = jsonfile.readFileSync(manifestPath)
const manifestBundle = manifest['manifest']['js']
const vendorBundle = manifest['common']['js']
const moduleBundle = manifest[moduleName]['js']

const commonParams = {
	manifestBundle,
	vendorBundle,
	moduleBundle,
	apiUrl,
	module: moduleName,
	cloudFrontUrl: cloudFrontUrl,
	canvasId: canvasId,
}

// 
// Auth from facebook page tab
// 
canvasRouter.post(`/${moduleName}`, canvasParser, (req, res) => {
	fetch(`${apiUrl}/fb_tab_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( Object.assign({}, req.body, {
			canvas_id: canvasId,
		}) )
	})
	.then(response => response.json())
	.then(json => {
		res.render('canvas', Object.assign({}, commonParams, {
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
			imagesUrl: json.images_url,
		}) )
	})
	.catch(exception =>
		{
			console.log('Parsing failed', exception)
			res.json({'error': exception})
		}
	)
})
// 
// Auth from standalone app page
// 
canvasRouter.get(`/${moduleName}/:checksum*`, canvasParser, (req, res) => {
	fetch(`${apiUrl}/standalone_auth.json`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			checksum: req.params.checksum,
		})
	})
	.then(response => response.json())
	.then(json =>{
		res.render('canvas', Object.assign({}, commonParams, {
			checksum: json.checksum,
			facebookAppId: json.fb_application_id,
			stylesheetUrl: json.stylesheet_url,
			messagesUrl: json.messages_url,
			imagesUrl: json.images_url,
		}) )
	})
	.catch(exception =>
		{
			console.log('Parsing failed', exception)
			res.json({'error': exception})
		}
	)
})

module.exports = canvasRouter