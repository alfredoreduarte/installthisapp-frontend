import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi, getExternal } from 'canvas/api'

export const loginCallback = () => {
	return dispatch => 
		dispatch(fetchTopFansSettings()).then(() => 
			// dispatch(fetchMessages()).then(() => dispatch(fetchEntities()))
			dispatch(fetchMessages()).then(() => {
				dispatch(fetchImages()).then(() => {
					dispatch(fetchEntities())
				})
			})
		)
}

export const receiveEntries = entities => ({
	type: 'RECEIVE_ENTRIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/entries.json`, response => {
			if (response.success) {
				dispatch(receiveEntries(response))
				// dispatch(push(`/${canvasId}/${checksum}`))
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
		return getFromApi(`${checksum}/settings.json`).then( response => {
			dispatch(receiveTopFansSettings(response))
		})
	}
}

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.messagesUrl).then( json => {
			dispatch(receiveMessages(json))
			return Promise.resolve()
		})
	}
}

// images

export const receiveImages = payload => ({
	type: 'RECEIVE_IMAGES',
	payload,
})

export const fetchImages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.imagesUrl).then( json => {
			dispatch(receiveImages(json))
			if (json.intro == null) {
				dispatch(push(`/${canvasId}/${checksum}/scores`))
			}
			return Promise.resolve()
		})
	}
}