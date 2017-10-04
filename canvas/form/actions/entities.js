import { normalize, arrayOf } from 'normalizr'
import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'
import * as schema from 'canvas/form/schema'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	entities,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const state = getState()
		const { checksum } = state.applicationData
		const { fetched } = state.entities
		if (fetched) {
			return Promise.resolve(true)
		}
		else {
			return getFromApi(`${checksum}/entities.json`, response => {
				if (response) {
					const normalized = normalize(response, schema.entities)
					return dispatch(receiveEntities(normalized.entities))
				}
			})
		}
	}
}