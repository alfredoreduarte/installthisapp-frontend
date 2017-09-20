import { normalize, arrayOf } from 'normalizr'
import { getFromApi } from 'canvas/api'
import { push } from 'react-router-redux'
import * as schema from 'canvas/memory_match/schema'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	entities,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		return getFromApi(`${checksum}/entities_authenticated.json`, response => {
			if (response.success) {
				const normalized = normalize(response, schema.entities)
				return dispatch(receiveEntities(normalized.entities))
			}
			else {
				return dispatch(push(`/memory_match/${checksum}/already-played`))
			}
		})
	}
}