const express = require('express')
const _ = require('lodash')
const jsonfile = require('jsonfile')

const cloudFrontUrl = process.env.CLOUDFRONT_URL

const router = express.Router()
const manifestPath = `${process.cwd()}/webpack-assets.json`
const manifest = jsonfile.readFileSync(manifestPath)
const manifestBundle = manifest['manifest']['js']
const jsBundle = manifest['landing']['js']
const cssBundle = manifest['landing']['css']
const vendorBundle = manifest['common']['js']
const isOldUser = false

const commonParams = req => {
	return {
		canonical: false,
		req: req,
		disableSegment: req.query[process.env.ALIAS_PARAM_KEY] || process.env.NODE_ENV == 'development',
		cloudFrontUrl: cloudFrontUrl,
		apiUrl: process.env.API_URL,
		facebookAppId: process.env.FB_APP_ID,
		jsBundle,
		cssBundle,
		vendorBundle,
		manifestBundle,
		isOldUser,
	}
}

/* GET home page. */
router.get('/', function(req, res) { res.render('landing-v2/apps', commonParams(req)) })

module.exports = router