import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as CONFIG from 'config.dev'
import { receiveEntities } from 'actions/entities'
import Cookies from 'js-cookie'

export const fetchFacebookPages = () => {
	const url = CONFIG.BASE_URL + '/fetch_pages_from_facebook.json'
	const api_key = Cookies.get('api_key')
	return (dispatch, getState) => {
		const newAppData = getState().newApp
		return fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': `Token token="${api_key}"`,
				},
			})
			.then(response => response.json())
			.then(json =>{
				const normalized = normalize(json, schema.entities)
				dispatch(receiveEntities(normalized.entities))
			})
			.catch(exception =>
				console.log('postNewApp: parsing failed', exception)
			)
	}
}