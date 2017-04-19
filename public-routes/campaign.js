require('isomorphic-fetch')
const express = require('express')
const jsonfile = require('jsonfile')

const cloudFrontUrl = process.env.CLOUDFRONT_URL
const router = express.Router()


const manifestPath = `${process.cwd()}/webpack-assets.json`
const manifest = jsonfile.readFileSync(manifestPath)
const manifestBundle = manifest['manifest']['js']
// const jsBundle = manifest['campaign']['js']
// const cssBundle = manifest['campaign']['css']
const vendorBundle = manifest['common']['js']

const copyDictionaryPath = `https://s3-us-west-2.amazonaws.com/installthisapp/campaigns/copy-dictionary.json`
var copyDictionary = null

function getDictionary(){
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		copyDictionary = json
		return json
	})
}

const commonParams = {
	cloudFrontUrl: cloudFrontUrl,
	apiUrl: process.env.API_URL,
	stripeKey: process.env.STRIPE_KEY,
	// jsBundle,
	// cssBundle,
	vendorBundle,
	manifestBundle,
}

router.get('/campaign/', function(req, res){
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/one', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-one']['js'],
			cssBundle: manifest['campaign-one']['css'],
		}))
	})
})
router.get('/campaign/one', function(req, res){
	// res.render('campaign/one', commonParams)
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/one', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-one']['js'],
			cssBundle: manifest['campaign-one']['css'],
		}))
	})
})
router.get('/campaign/two', function(req, res){
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/two', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-two']['js'],
			cssBundle: manifest['campaign-two']['css'],
		}))
	})
})
router.get('/campaign/three', function(req, res){
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/three', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-three']['js'],
			cssBundle: manifest['campaign-three']['css'],
		}))
	})
})
router.get('/campaign/four', function(req, res){
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/four', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-four']['js'],
			cssBundle: manifest['campaign-four']['css'],
		}))
	})
})
router.get('/campaign/five', function(req, res){
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
	.then(function(response){ return response.json() })
	.then(function(json){
		const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
		res.render('campaign/five', Object.assign({}, commonParams, {
			copyGroup: json[copyGroup],
			jsBundle: manifest['campaign-five']['js'],
			cssBundle: manifest['campaign-five']['css'],
		}))
	})
})

module.exports = router