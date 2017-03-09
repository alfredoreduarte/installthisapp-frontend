import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import * as schema from 'canvas/photo_contest/schema'
import { allPhotos } from 'canvas/photo_contest/selectors/photos'
import { fetchImages } from 'canvas/photo_contest/actions/images'
import { getFromApi, postToApi, getExternal } from 'canvas/api'

export const getStaticContentWithIntroRedirect = (nextState, replace, next, dispatch) => 
						dispatch(fetchMessages())
						.then(() => dispatch(fetchImages(`/photos`)))
						.then(next())
export const getPhotosWithoutRedirects = (nextState, replace, next, dispatch) =>
						dispatch(fetchMessages())
						.then(() => {
							return dispatch(fetchImages(`/${nextState.params.photoId}`))
						})
						.then(next())

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

export const receiveGameSettings = payload => ({
	type: 'RECEIVE_SETTINGS',
	payload,
})

export const loginCallback = () => {
	return dispatch => {
		return dispatch(fetchEntities()).then(() => dispatch(fetchImages())).then(() => dispatch(fetchMessages()))
		// return dispatch(fetchEntities()).then(() => dispatch(fetchMessages())).then(() => {
		// 	return dispatch(push(`/${window.canvasId}/${window.checksum}`))
		// })
	}
}

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/viewmodel.json`).then( json => {
			const payload = normalize(json.payload, schema.payload)
			const settings = json.settings
			dispatch(receiveGameSettings(settings))
			return dispatch(receiveEntities(payload.entities))
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