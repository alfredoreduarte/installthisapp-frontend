import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import { getFromApi, postToApi } from 'api'

export const receiveTriviaEntities = entities => ({
	type: 'TRIVIA/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchTriviaEntities = checksum => {
	return dispatch => {
		return getFromApi(`applications/${checksum}/entities.json`)
				.then(response =>{
					const normalized = normalize(response, schema.entities)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const beforeShowingDashboard = fetchTriviaEntities