const express = require('express')
const jsonfile = require('jsonfile')

const cloudFrontUrl = process.env.CLOUDFRONT_URL
const router = express.Router()

// 
// Renders the dashboard view. I.e. the main app.
// The 'alias' variable sets the id of the client to be impersonated,
// which in turn gets passed form the admin users list with a GET param
// defined as ALIAS_PARAM_KEY env variable.
// 
router.get('/d*', function(req, res){
	const manifestPath = `${process.cwd()}/webpack-assets.json`
	const manifest = jsonfile.readFileSync(manifestPath)
	const manifestBundle = manifest['manifest']['js']
	const jsBundle = manifest['dashboard']['js']
	const cssBundle = manifest['dashboard']['css']
	const vendorBundle = manifest['common']['js']
	res.render('dashboard', {
		disableSegment: req.query[process.env.ALIAS_PARAM_KEY] || process.env.NODE_ENV == 'development',
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

module.exports = router