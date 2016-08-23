import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { receiveEntities } from 'actions/entities'
import { readFromApi } from 'api'

export const fetchFacebookPages = () => {
	return dispatch =>
		readFromApi('fetch_pages_from_facebook.json', response => {
			const normalized = normalize(response, schema.entities)
				dispatch(receiveEntities(normalized.entities))
		})
}