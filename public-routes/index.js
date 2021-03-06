const express = require('express')
const _ = require('lodash')
const jsonfile = require('jsonfile')

const cloudFrontUrl = process.env.CLOUDFRONT_URL

const router = express.Router()
const manifestPath = `${process.cwd()}/webpack-assets.json`
const manifest = jsonfile.readFileSync(manifestPath)
const manifestBundle = manifest['manifest']['js']
const jsBundle = manifest['landing']['js']
const jsPublicLoginBundle = manifest['publiclogin']['js'] // publiclogin
const cssBundle = manifest['landing']['css']
const vendorBundle = manifest['common']['js']
// const isOldUser = req.query.segment == 'old_users'
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
router.get('/', function(req, res) {
	res.render('landing-v2/index', commonParams(req))
})
router.get('/apps', function(req, res) {
	res.render('landing-v2/apps', commonParams(req))
})
router.get('/lead-ads-sync', function(req, res) {
	res.render(
		'landing-v2/leadsync',
		Object.assign({}, commonParams(req), {
			canonical: '/lead-ads-sync',
		})
	)
})
router.get('/facebook-lead-ads', function(req, res) {
	res.render(
		'landing-v2/leadsync-es',
		Object.assign({}, commonParams(req), {
			canonical: '/facebook-lead-ads',
		})
	)
})
router.get('/privacy-policy', function(req, res) {
	res.render('landing-v2/privacy-policy', commonParams(req))
})
router.get('/terms-conditions', function(req, res) {
	res.render('landing-v2/terms-conditions', commonParams(req))
})
router.get('/refund-policy', function(req, res) {
	res.render('landing-v2/refund-policy', commonParams(req))
})
router.get('/pricing', function(req, res) {
	res.render(
		'landing-v2/pricing',
		Object.assign({}, commonParams(req), {
			jsPublicLoginBundle: jsPublicLoginBundle,
		})
	)
})
router.get('/contact', function(req, res) {
	res.render('landing-v2/contact', commonParams(req))
})
router.get('/white-label-contests', function(req, res) {
	res.render('landing-v2/white-label', commonParams(req))
})
// router.get('/signup', function(req, res) { res.render('signup', commonParams(req)) })
router.get('/signup', function(req, res) {
	res.render(
		'signup',
		Object.assign({}, commonParams(req), {
			redirect: req.query.redirect,
			email: req.query.email,
		})
	)
})
router.get('/login', function(req, res) {
	res.render(
		'login',
		Object.assign({}, commonParams(req), {
			redirect: req.query.redirect,
			email: req.query.email,
		})
	)
})
router.get('/please-confirm', function(req, res) {
	res.render(
		'please-confirm',
		Object.assign({}, commonParams(req), {
			emailAddress: req.query.email,
		})
	)
})
router.get('/card', function(req, res) {
	res.render('card', commonParams(req))
})
router.get('/forgot', function(req, res) {
	res.render('forgot', commonParams(req))
})
router.get('/forgot/sent', function(req, res) {
	res.render('forgot-sent', commonParams(req))
})
router.get('/reset-password', function(req, res) {
	res.render(
		'reset-password',
		Object.assign({}, commonParams(req), {
			clientId: req.query.client_id,
			uid: req.query.uid,
			token: req.query.token,
		})
	)
})

// Module landings
const topFansHandler = function(req, res) {
	res.render(
		'landing-v2/app',
		_.merge(commonParams(req), {
			canonical: '/top-fans',
			app: 'top_fans',
			appExampleLink: 'https://v3.installthisapp.com/app2/DUPFER',
			pageTitle: 'Top Fans Ranking for Facebook Pages',
			pageSubTitle:
				"This app scans your Facebook Page's timeline to collect every single like and comment in real time. Scores are shown in a list, with your own style, and you can share it everywhere.",
			whatCanIDoQuestion: 'What can I do with the Top Fans app?',
			whatCanIDoAnswer:
				'Save hundreds of $ by incentivizing people to like and comment on your content instead of paying for promoted posts',
			createText: 'Create a Top Fans app',
		})
	)
}
router.get('/top-fans-for-facebook-pages.html', topFansHandler)
router.all('/top-fans/', topFansHandler)

const memoryMatchHandler = function(req, res) {
	res.redirect('/apps')
}
router.all('/memory-match/', memoryMatchHandler)

const formHandler = function(req, res) {
	res.redirect('/apps')
}
router.all('/form/', formHandler)
// avoiding URL conflict with form canvas POST
router.all('/form-fb-search/', formHandler)

const couponsHandler = function(req, res) {
	res.redirect('/apps')
}
router.all('/coupons/', couponsHandler)
// avoiding URL conflict with coupons canvas POST
router.all('/coupons-fb-search/', couponsHandler)

const fanGateHandler = function(req, res) {
	res.redirect('/apps')
}
router.all('/fan-gate/', fanGateHandler)

const catalogHandler = function(req, res) {
	res.redirect('/apps')
}
router.all('/catalog/', catalogHandler)
// avoiding URL conflict with catalog canvas POST
router.all('/catalog-fb-search/', catalogHandler)

const photoContestHandler = function(req, res) {
	res.render(
		'landing-v2/app',
		_.merge(commonParams(req), {
			canonical: '/photo-contest',
			app: 'photo_contest',
			appExampleLink: 'https://v3.installthisapp.com/app3/7EHEU0',
			pageTitle: 'Photo Contest for social media campaigns',
			pageSubTitle: "Create contests about people's best holiday, birthday, conert photos",
			whatCanIDoQuestion: 'What can I do with the Photo Contest app?',
			whatCanIDoAnswer:
				'Imagine launching a competition where people share their favorite christmas photos and ask all of their friends for votes.',
			createText: 'Create a Top Fans app',
		})
	)
}
router.get('/photo-contest.html', photoContestHandler)
router.all('/photo-contest', photoContestHandler)

const triviaHandler = function(req, res) {
	res.render(
		'landing-v2/app',
		_.merge(commonParams(req), {
			canonical: '/trivia',
			app: 'trivia',
			appExampleLink: 'https://v3.installthisapp.com/app1/ZRRDDP',
			pageTitle: 'Trivia game for Social Campaigns',
			pageSubTitle: "Test your audience's knowledge about any subject, and spice it up a bit with a countdown",
			whatCanIDoQuestion: 'What can I do with the Trivia app?',
			whatCanIDoAnswer: "Test your audience's knowledge about any subject, and spice it up a bit with a countdown",
			createText: 'Create a Trivia app and write some questions',
		})
	)
}
router.get('/trivia-contest.html', triviaHandler)
router.all('/trivia', triviaHandler)
// avoiding URL conflict with trivia canvas POST
router.all('/trivia-fb-search/', triviaHandler)

module.exports = router
