import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/top_fans/schema'
import * as CONFIG from 'config'
import humps from 'humps'
import Cookies from 'js-cookie'

export const receiveTopFansEntities = (entities) => ({
	type: 'TOP_FANS/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchTopFansEntities = (checksum) => {
	const url = CONFIG.API_URL + `/applications/${checksum}/likes.json`
	const api_key = Cookies.get('api_key')
	return dispatch => {
		return fetch(url, {
					method: 'GET',
					headers: {
						'Authorization': `Token token="${api_key}"`,
					},
				})
				.then(response => response.json())
				.then(json =>{
					const camelizedJson = humps.camelizeKeys(json)
					console.log('response')
					console.log(camelizedJson)
					// const normalized = normalize(camelizedJson, schema.entities)
					// dispatch(receiveTopFansEntities(normalized.entities))
					dispatch(receiveTopFansEntities(camelizedJson))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}