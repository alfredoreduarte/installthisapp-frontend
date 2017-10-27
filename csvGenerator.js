const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// CSV Specification
// http://www.ietf.org/rfc/rfc4180.txt

router.post('/generate-csv', bodyParser.json(), (req, res) => {
	const dataAsString = req.body
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/csv')
	dataAsString.data.forEach(function(item) {
		res.write(
			item
				.map(function(field) {
					return '"' + field.toString().replace(/\"/g, '""') + '"'
				})
				.toString() + '\r\n'
		)
	})
	res.end()
})

module.exports = router
