import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config.dev'
import humps from 'humps'
import Cookies from 'js-cookie'

export const receiveTriviaEntities = (entities) => ({
	type: 'TRIVIA/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchTriviaEntities = (checksum) => {
	const url = CONFIG.BASE_URL + `/applications/${checksum}/questions.json`
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
					const normalized = normalize(camelizedJson, schema.entities)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}