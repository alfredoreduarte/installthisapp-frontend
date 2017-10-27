const express = require('express')

const router = express.Router()
const apiUrl = process.env.API_URL

/* GET home page. */
router.get('/gateway/:checksum', function(req, res) {
	const checksum = req.param('checksum')
	fetch(`${apiUrl}/${checksum}/data_for_gateway.json`, {
		method: 'GET',
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(json) {
			const hasFacebookTab = json.has_fb_tab
			const facebookTabUrl = json.facebook_tab_url
			const applicationType = json.application_type
			res.render('gateway', {
				checksum: checksum,
				applicationTitle: json.title,
				hasFacebookTab: hasFacebookTab,
				gatewayUrl: 'https://' + req.headers.host + '/gateway/' + checksum,
				canvasUrl: 'https://' + req.headers.host + '/' + applicationType + '/' + checksum,
				facebookTabUrl: facebookTabUrl,
				ogTitle: json.open_graph_title,
				ogDescription: json.open_graph_description,
				ogImage: json.open_graph_image,
			})
		})
})

module.exports = router
