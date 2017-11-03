import 'isomorphic-fetch'
import downloadjs from 'downloadjs'
import { deleteFromApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'

export const deleteEntry = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/entries_destroy.json`, { id }).then(response => {
			if (response.status == 'ok') {
				return dispatch(removeEntry(id))
			}
		})
	}
}

export const removeEntry = id => ({
	type: 'MEMORY_MATCH/REMOVE_ENTRY',
	id,
})

// CSV generator
export const generateCsv = () => {
	return (dispatch, getState) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const csvHeaders = ['Facebook ID', 'name', 'clicks', 'time in seconds']
		const entries = getFilteredEntries(state)
		const sanitizedForSheet = entries.map(entry => {
			return {
				identifier: entry.user.identifier,
				name: entry.user.name,
				cicks: entry.clicks,
				time: entry.time,
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
