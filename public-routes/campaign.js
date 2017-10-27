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
const getCurrentUrl = function(req) {
	return req.protocol + '://' + req.get('host') + req.originalUrl
}
const getCurrentDomain = function(req) {
	return req.protocol + '://' + req.get('host')
}

const copyDictionaryPath = `https://s3-us-west-2.amazonaws.com/${process.env.S3_BUCKET}/campaigns/copy-dictionary.json`
var copyDictionary = null

function getDictionary() {
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(json) {
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

//
// Not specifying the langing variation returns a random variation
//
router.get('/campaign/', function(req, res) {
	//
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(json) {
			const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
			const variants = ['one', 'two', 'three', 'four', 'five']
			const randomVariant = variants[Math.floor(Math.random() * variants.length)]
			res.render(
				'campaign/' + randomVariant,
				Object.assign({}, commonParams, {
					req: req,
					currentUrl: getCurrentUrl(req),
					currentDomain: getCurrentDomain(req),
					copyGroupName: copyGroup,
					variant: randomVariant,
					copyGroup: json[copyGroup],
					jsBundle: manifest['campaign-' + randomVariant]['js'],
					cssBundle: manifest['campaign-' + randomVariant]['css'],
				})
			)
		})
})
router.get('/campaign/:variant', function(req, res) {
	const variant = req.param('variant')
	fetch(copyDictionaryPath, {
		method: 'GET',
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(json) {
			const copyGroup = req.param('copygroup') ? req.param('copygroup') : 1
			res.render(
				'campaign/' + variant,
				Object.assign({}, commonParams, {
					req: req,
					currentUrl: getCurrentUrl(req),
					currentDomain: getCurrentDomain(req),
					copyGroupName: copyGroup,
					variant: variant,
					copyGroup: json[copyGroup],
					jsBundle: manifest['campaign-' + variant]['js'],
					cssBundle: manifest['campaign-' + variant]['css'],
				})
			)
		})
})

module.exports = router
