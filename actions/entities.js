import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import humps from 'humps'
import { readFromApi } from 'api'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return dispatch =>
		readFromApi('admin_user_properties.json', response => {
			const camelizedJson = humps.camelizeKeys(response)
			const normalized = normalize(camelizedJson, schema.entities)
			dispatch(receiveEntities(normalized.entities))
		})
}