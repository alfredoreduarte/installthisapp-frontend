import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as CONFIG from 'config.dev'

export const receiveEntities = (entities) => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	const url = CONFIG.BASE_URL + '/entities'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.entities)
					dispatch(receiveEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}