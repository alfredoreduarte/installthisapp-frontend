import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { receiveEntities } from 'actions/entities'
import { toggleActivityLoadingPages } from 'actions/activityIndicators'
import { getFromApi } from 'api'

export const fetchFacebookPages = () => {
	return dispatch => {
		dispatch(toggleActivityLoadingPages())
		getFromApi('admin_users/fb_pages/fetch.json', response => {
			const normalized = normalize(response, schema.entities)
			dispatch(receiveEntities(normalized.entities))
			dispatch(toggleActivityLoadingPages())
		})
	}
}