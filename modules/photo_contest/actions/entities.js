import 'isomorphic-fetch'
import downloadjs from 'downloadjs'
import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/photo_contest/schema'
import { getFilteredEntries } from 'modules/photo_contest/selectors/entries'
import { getFromApi } from 'api'

export const receiveEntities = (entities, applicationLog) => ({
	type: 'PHOTO_CONTEST/RECEIVE_ENTITIES',
	entities,
	applicationLog,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		return getFromApi(`applications/${currentApp.checksum}/entities.json`).then(response => {
			if (response) {
				const normalized = normalize(response, schema.entities)
				dispatch(receiveEntities(normalized.entities, response.applicationLog))
			}
		})
	}
}

export const beforeShowingDashboard = fetchEntities

// CSV generator
export const generateCsv = () => {
	return (dispatch, getState) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const csvHeaders = ['Facebook ID', 'Name', 'votes', 'photo']
		const entries = getFilteredEntries(state)
		const sanitizedForSheet = entries.map(entry => {
			return {
				identifier: entry.user.identifier,
				name: entry.user.name,
				votes: entry.votesCount,
				photo: entry.attachmentUrl,
			}
		})
		const arrayOfArrays = sanitizedForSheet.map(entry => {
			return Object.values(entry)
		})
		const entriesWithHeaders = [csvHeaders, ...arrayOfArrays]
		fetch('/generate-csv', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: entriesWithHeaders,
			}),
		})
			.then(function(resp) {
				return resp.blob()
			})
			.then(function(blob) {
				downloadjs(blob)
			})
			.catch(exception => console.log('parsing failed', exception))
	}
}
// CSV generator
