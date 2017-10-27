const express = require('express')
const aws = require('aws-sdk')
const router = express.Router()

//
// Direct uploads to S3 as instructed by
// https://devcenter.heroku.com/articles/s3-upload-node
//
router.get('/sign-s3', (req, res) => {
	const s3 = new aws.S3()
	const fileName = req.query['file-name']
	const fileType = req.query['file-type']
	const s3Params = {
		Bucket: process.env.S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read',
	}
	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err)
			return res.end()
		}
		const returnData = {
			signedRequest: data,
			url: `https://${process.env.CLOUDFRONT_DOMAIN}/${fileName}`,
		}
		res.write(JSON.stringify(returnData))
		res.end()
	})
})

module.exports = router
