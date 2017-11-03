import 'isomorphic-fetch'
import downloadjs from 'downloadjs'
import { normalize, arrayOf } from 'normalizr'
import toHHMMSS from 'lib/toHHMMSS'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/capture_the_flag/schema'
import { getFromApi } from 'api'
import { getFilteredEntries } from 'modules/capture_the_flag/selectors/entries'

export const receiveEntities = (entities, applicationLog) => ({
	type: 'CAPTURE_THE_FLAG/RECEIVE_ENTITIES',
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
		const csvHeaders = ['Facebook ID', 'Name', 'Accumulated time']
		const entries = getFilteredEntries(state)
		const sanitizedForSheet = entries.map(entry => {
			return {
				identifier: entry.user.identifier,
				name: entry.user.name,
				time: entry.hasFlag ? `${toHHMMSS(entry.elapsedSeconds)} - before capturing the flag` : toHHMMSS(entry.elapsedSeconds),
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
