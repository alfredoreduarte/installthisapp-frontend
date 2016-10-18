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
			if (response.status) {
				dispatch(receiveTopFansEntities(response.payload))
			}
			else{
				console.log('app is not subscribed to any page')
			}
		})
}

export const fetchTopFansSettings = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/settings.json`).then( response => {
			console.log('top fans settings')
			console.log(response)
			dispatch(receiveTopFansSettings(response))
		})
}