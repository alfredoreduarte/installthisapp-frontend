import { normalize, arrayOf } from 'normalizr'
import _ from 'lodash'
import { getFromApi, getExternal, postToApi } from 'canvas/api'
import { push } from 'react-router-redux'
import * as schema from 'canvas/form/schema'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	entities,
})

// 
// Digesting payload before submit
// 
// Turning the object into a collection because otherwise 
// normalizr mangles alphanumeric IDs used as object keys.]
// 
// Original format: {'12342-asdfx-1321': 'My name'}
// Digested format: [{'id':'12342-asdfx-1321', 'content':'My name'}]
// 
export const submitForm = () => {
	return (dispatch, getState) => {
		const state = getState()
		const { checksum } = state.applicationData
		const digested = _.map(state.form.entry.values, (val, key) => ({
			id: key,
			content: val,
		}))
		return postToApi(`${checksum}/unauthenticated_entries_create.json`, {
			entry: digested,
		}, response => {
			if (response.success) {
				dispatch(push(`/form/${checksum}/thanks`))
			}
		})
	}
}