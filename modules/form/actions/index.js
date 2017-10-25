import downloadjs from 'downloadjs'
import { postToApi, getFromApi } from 'api'
import { getSchema } from 'modules/form/selectors/schema'
import { getCurrentAppByState } from 'selectors/apps'
import { getFilteredEntries } from 'modules/form/selectors/entries'

// CSV generator
export const generateCsv = () => {
	return ( dispatch, getState ) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		let csvHeaders = getSchema(state).map(field => field.question)
		csvHeaders.push('Created At')
		// const csvHeaders = ['identifier', 'name', 'likes', 'comments', 'score']
		const entries = getFilteredEntries(state)
		const arrayOfArrays = entries.map(entry => {
			return Object.values(entry)
		})
		const entriesWithHeaders = [ csvHeaders, ...arrayOfArrays ]
		fetch('/generate-csv', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: entriesWithHeaders
				}),
			})
			.then(function(resp) {
				return resp.blob();
			}).then(function(blob) {
				downloadjs(blob);
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
	}
}
// CSV generator