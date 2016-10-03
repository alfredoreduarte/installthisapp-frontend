import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/top_fans/schema'
import { getFromApi } from 'api'

export const receiveTopFansEntities = entities => ({
	type: 'TOP_FANS/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const receiveTopFansSettings = payload => ({
	type: 'TOP_FANS/RECEIVE_SETTINGS',
	payload,
})

export const fetchTopFansEntities = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/entries.json`).then( response => {
			console.log('tf ents')
			console.log(response)
			dispatch(receiveTopFansEntities(response))
		})
}

export const fetchTopFansSettings = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/settings.json`).then( response => {
			// console.log('settings')
			// console.log(response)
			dispatch(receiveTopFansSettings(response))
		})
}