import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import * as schema from 'canvas/photo_contest/schema'
import { allPhotos } from 'canvas/photo_contest/selectors/photos'
import { getFromApi, postToApi, getExternal } from 'canvas/api'

export function toggleActivityIndicator(){
	return {
		type: 'TOGGLE_ACTIVITY_INDICATOR'
	}
}

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const receiveGameSettings = settings => ({
	type: 'RECEIVE_SETTINGS',
	settings,
})

export const loginCallback = () => {
	return dispatch => {
		return dispatch(fetchEntities()).then(() => dispatch(fetchMessages()))
	}
}

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/viewmodel.json`).then( json => {
			const payload = normalize(json.payload, schema.payload)
			const settings = json.settings
			dispatch(receiveEntities(payload.entities))
			dispatch(receiveGameSettings(settings))
			return Promise.resolve()
		})
	}
}

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.messagesUrl).then( json => {
			dispatch(receiveMessages(json))
			return Promise.resolve()
		})
	}
}