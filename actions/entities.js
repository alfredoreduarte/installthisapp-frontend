import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as CONFIG from 'config.dev'
import Cookies from 'js-cookie'
import humps from 'humps'

export const receiveEntities = (entities) => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	const url = CONFIG.BASE_URL + '/admin_user_properties.json'
	const api_key = Cookies.get('api_key')
	return dispatch => {
		return fetch(url, {
					method: 'GET',
					headers: {
						'Authorization': `Token token="${api_key}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					const camelizedJson = humps.camelizeKeys(json)
					console.log(camelizedJson)
					const normalized = normalize(camelizedJson, schema.entities)
					dispatch(receiveEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}