import { normalize, arrayOf } from 'normalizr'
import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'
import * as schema from 'canvas/capture_the_flag/schema'

export const resetEntitiesCacheFlag = () => ({
	type: 'ENTITIES/RESET_CACHE_FLAG',
})

export const receiveEntities = (entities, timeLeft) => ({
	type: 'RECEIVE_ENTITIES',
	entities,
	timeLeft,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { fetched } = getState().entities
		if (fetched) {
			return Promise.resolve(true)
		} else {
			return getFromApi(`${checksum}/entities.json`, response => {
				if (response.success) {
					dispatch(pollEntries())
					const normalized = normalize(response, schema.entities)
					return dispatch(receiveEntities(normalized.entities, response.timeLeft))
				}
			})
		}
	}
}

let theInterval = null
export const pollEntries = () => {
	return dispatch => {
		if (!theInterval) {
			theInterval = setInterval(() => {
				console.log('one lap!')
				dispatch(resetEntitiesCacheFlag())
				return dispatch(fetchEntities()).then(() => {
					// clearInterval(theInterval)
				})
			}, 1000)
		}
	}
}
