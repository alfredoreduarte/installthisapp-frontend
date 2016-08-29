import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { receiveEntities } from 'actions/entities'
import { getFromApi } from 'api'

export const fetchFacebookPages = () => {
	return dispatch =>
		getFromApi('fetch_pages_from_facebook.json', response => {
			const normalized = normalize(response, schema.entities)
				dispatch(receiveEntities(normalized.entities))
		})
}