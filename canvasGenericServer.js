const corresponding = {
	'trivia': 			'app1',
	'top_fans': 		'app2',
	'photo_contest': 	'app3',
	'memory_match': 	'app4',
	'catalog': 			'app5',
	'form': 			'app6',
	'fan_gate': 		'app7',
	'coupons': 			'app8',
	'static_html': 		'app9',
}

const modulesRegex = 'trivia|top_fans|photo_contest|memory_match|catalog|form|fan_gate|coupons|static_html'

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
canvasRouter.get(`/:moduleName(${modulesRegex})/favicon.ico`, (req, res) => {
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

const commonParamsGenerator = function(moduleName, json){
	return {
		manifestBundle,
		vendorBundle,
		moduleBundle: manifest[moduleName]['js'],
		apiUrl,
		module: moduleName,
		cloudFrontUrl: cloudFrontUrl,
		canvasId: corresponding[moduleName],
		checksum: json.checksum,
		facebookAppId: json.fb_application_id,
		stylesheetUrl: json.stylesheet_url,
		messagesUrl: json.messages_url,
		imagesUrl: json.images_url,
		customJavascript: json.custom_javascript,
	}
}

const fetchParams = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
}

// 
// Auth from facebook page tab
// 
canvasRouter.post(`/:moduleName(${modulesRegex})`, canvasParser, (req, res) => {
	fetch(`${apiUrl}/fb_tab_auth.json`, Object.assign( {}, fetchParams, {
		body: JSON.stringify( Object.assign({}, req.body, {
			canvas_id: corresponding[req.params.moduleName],
		}) )
	} ))
	.then(response => response.json())
	.then(json => {
		const commonParams = commonParamsGenerator(req.params.moduleName, json)
		res.render('canvas', commonParams)
	})
	.catch(exception =>
		{
			console.log('Parsing failed 1', exception)
			res.json({'error': exception})
		}
	)
})
// 
// Auth from standalone app page
// 
// try this regex for checksum: (^[a-zA-Z0-9]{6})
// 
canvasRouter.get(`/:moduleName(${modulesRegex})/:checksum*`, canvasParser, (req, res) => {
	fetch(`${apiUrl}/standalone_auth.json`, Object.assign( {}, fetchParams, {
		body: JSON.stringify({ checksum: req.params.checksum })
	} ))
	.then(response => response.json())
	.then(json =>{
		const commonParams = commonParamsGenerator(req.params.moduleName, json)
		res.render('canvas', commonParams)
	})
	.catch(exception =>
		{
			console.log('Parsing failed 2', exception)
			res.json({'error': exception})
		}
	)
})

module.exports = canvasRouter