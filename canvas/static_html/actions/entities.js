import { normalize, arrayOf } from 'normalizr'
import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'
import * as schema from 'canvas/static_html/schema'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	entities,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { fetched } = getState().entities
		if (fetched) {
			return Promise.resolve(true)
		}
		else {
			return getFromApi(`${checksum}/entities.json`, response => {
				if (response.success) {
					const normalized = normalize(response, schema.entities)
					console.log('normal', normalized)
					return dispatch(receiveEntities(normalized.entities))
				}
			})
		}
	}
}