import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi } from 'canvas/api'

export const loginCallback = () => {
	return dispatch => {
		dispatch(fetchEntities())
		dispatch(fetchTopFansSettings())
	}
}

export const receiveEntries = entities => ({
	type: 'RECEIVE_ENTRIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return (dispatch, getState) =>{
		const { checksum, canvasId } = getState().applicationData
		getFromApi(`${checksum}/entries.json`, response => {
			console.log('api res')
			console.log(response)
			if (response.status == 'ok') {
				dispatch(receiveEntries(response))
				dispatch(push(`/${canvasId}/${checksum}`))
			}
		})
	}
}

export const receiveTopFansSettings = payload => ({
	type: 'RECEIVE_SETTINGS',
	payload,
})

export const fetchTopFansSettings = checksum => {
	return (dispatch, getState) =>{
		const { checksum, canvasId } = getState().applicationData
		getFromApi(`${checksum}/settings.json`).then( response => {
			console.log('settings')
			console.log(response)
			dispatch(receiveTopFansSettings(response))
		})
	}
}