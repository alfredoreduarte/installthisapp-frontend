import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config.dev'

export const receiveTriviaEntities = (entities) => ({
	type: 'TRIVIA/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchTriviaEntities = () => {
	const url = CONFIG.BASE_URL + '/entities.trivia'
	// const url = '/entities.trivia'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.entities)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}