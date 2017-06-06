import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import { getFromApi, postToApi } from 'api'

export const receiveEntities = (entities, applicationLog) => ({
	type: 'TRIVIA/RECEIVE_ENTITIES',
	entities,
	applicationLog,
})

export const fetchEntities = checksum => {
	return dispatch => {
		return getFromApi(`applications/${checksum}/entities.json`)
				.then(response =>{
					const normalized = normalize(response, schema.entities)
					dispatch(receiveEntities(normalized.entities, response.applicationLog))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const beforeShowingDashboard = fetchEntities