const express = require('express')
const _ = require('lodash')
const removeMd = require('remove-markdown')
const marked = require('marked')
const router = express.Router()
const contentful = require('contentful')

const client = contentful.createClient({
	space: 'lm5ligtbptz1',
	accessToken: '2c22429b01aa0e499ceba80254b2b825966738efb9207e75d517c0d1837b3df2'
})

// first time you are syncing make sure to spcify `initial: true`
const locale = 'en-US'
var entries = []
var syncToken = null

const saveEntries = function(newEntries){
	if (entries.length) {
		newIds = _.map(newEntries, function(newEntry){
			return newEntry.sys.id
		})
		if (newIds.length) {
			entries = _.map(entries, function(entry){
				if (newIds.indexOf(entry.sys.id) < 0) {
					return entry
				}
				else {
					updated = _.find(newEntries, function(newEntry){
						return newEntry.sys.id == entry.sys.id
					})
					return updated
				}
			})
		}
	}
	else {
		entries = newEntries
	}
}

const deleteEntries = function(deletedEntries){
	const deletedEntryIds= _.map(deletedEntries, function(entry){
		return entry.sys.id
	})
	entries = _.filter(entries, function(entry){
		return deletedEntryIds.indexOf(entry.sys.id) < 0
	})
}

const updateEntries = function(updatedEntries){
	entries = _.map(entries, function(entry){
		return deletedEntryIds.indexOf(entry.sys.id) < 0
	})
}

client.sync({initial: true}).then( function(response){
	syncToken = response.nextSyncToken
	saveEntries(response.entries)
	deleteEntries(response.deletedEntries)
})

router.use('/forcesync', function(req, res) {
	subsequent()
	res.send('fired a sync')
})

const subsequent = function(){
	return client.sync({
		nextSyncToken: syncToken,
	}).then(function(response){
		syncToken = response.nextSyncToken
		saveEntries(response.entries)
		deleteEntries(response.deletedEntries)
	})
}

/* GET home page. */
router.get('/*', function(req, res) {
	const landingVariant = req.path.substr(1) || 'default'
	const entry = _.find(entries, function(entry){
		return entry.fields.slug[locale] == landingVariant
	})
	if (entry) {
		const processedSubheading = marked(entry.fields.subheading[locale])
		const plainSubheading = removeMd(entry.fields.subheading[locale])
		res.render('pipelead/index', {
			meta: {
				title: entry.fields.heading[locale],
				description: plainSubheading,
			},
			content: {
				h1: entry.fields.heading[locale],
				subheading: processedSubheading,
			}
		})
	}
	else{
		res.locals.message = 'Not found'
		res.locals.error = {
			status: 'The requested URL does not exist'
		}
		res.status(400)
		res.render('error')
	}
})

module.exports = router