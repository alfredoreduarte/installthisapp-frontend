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
// const isOldUser = req.query.segment == 'old_users'
const isOldUser = false

const commonParams = {
	cloudFrontUrl: cloudFrontUrl,
	apiUrl: process.env.API_URL,
	facebookAppId: process.env.FB_APP_ID,
	jsBundle,
	cssBundle,
	vendorBundle,
	manifestBundle,
	isOldUser,
}

/* GET home page. */
router.get('/', function(req, res) { res.render('landing-v2/index', commonParams) })
router.get('/apps', function(req, res) { res.render('landing-v2/apps', commonParams) })
router.get('/privacy-policy', function(req, res) { res.render('landing-v2/privacy-policy', commonParams) })
router.get('/terms-conditions', function(req, res) { res.render('landing-v2/terms-conditions', commonParams) })
router.get('/refund-policy', function(req, res) { res.render('landing-v2/refund-policy', commonParams) })
router.get('/pricing', function(req, res) { res.render('landing-v2/pricing', commonParams) })
router.get('/contact', function(req, res) { res.render('landing-v2/contact', commonParams) })
router.get('/signup', function(req, res) { res.render('signup', commonParams) })
router.get('/login', function(req, res) { res.render('login', commonParams) })
router.get('/card', function(req, res) { res.render('card', commonParams) })
router.get('/forgot', function(req, res) { res.render('forgot', commonParams) })
router.get('/forgot/sent', function(req, res) { res.render('forgot/sent', commonParams) })
router.get('/reset-password', function(req, res) { res.render('reset-password', commonParams) })

// Module landings

router.get('/top-fans-for-facebook-pages.html', function(req, res) { res.render('landing-v2/app', _.merge(commonParams, {
	app: "top_fans",
	appExampleLink: 'https://v3.installthisapp.com/app2/DUPFER',
	pageTitle: "Top Fans Ranking for Facebook Pages",
	pageSubTitle: "This app scans your Facebook Page's timeline to collect every single like and comment in real time. Scores are shown in a list, with your own style, and you can share it everywhere.",
	whatCanIDoQuestion: "What can I do with the Top Fans app?",
	whatCanIDoAnswer: "Save hundreds of $ by incentivizing people to like and comment on your content instead of paying for promoted posts",
	createText: "Create a Top Fans app",
})) })
router.get('/photo-contest.html', function(req, res) { res.render('landing-v2/app', _.merge(commonParams, {
	app: "photo_contest",
	appExampleLink: 'https://v3.installthisapp.com/app3/7EHEU0',
	pageTitle: "Photo Contest for social media campaigns",
	pageSubTitle: "Create contests about people's best holiday, birthday, conert photos",
	whatCanIDoQuestion: "What can I do with the Photo Contest app?",
	whatCanIDoAnswer: "Imagine launching a competition where people share their favorite christmas photos and ask all of their friends for votes.",
	createText: "Create a Top Fans app",
})) })
router.get('/trivia-contest.html', function(req, res) { res.render('landing-v2/app', _.merge(commonParams, {
	app: "trivia",
	appExampleLink: 'https://v3.installthisapp.com/app1/ZRRDDP',
	pageTitle: "Trivia game for Social Campaigns",
	pageSubTitle: "Test your audience's knowledge about any subject, and spice it up a bit with a countdown",
	whatCanIDoQuestion: "What can I do with the Trivia app?",
	whatCanIDoAnswer: "Test your audience's knowledge about any subject, and spice it up a bit with a countdown",
	createText: "Create a Trivia app and write some questions",
})) })

module.exports = router