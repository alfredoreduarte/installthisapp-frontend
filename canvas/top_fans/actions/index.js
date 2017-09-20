import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi, getExternal } from 'canvas/api'
import { getSingleUserScores } from 'canvas/top_fans/actions/user'

export const loginCallback = () => {
	return dispatch => 
		dispatch(fetchTopFansSettings()).then(() => 
			// dispatch(fetchMessages()).then(() => dispatch(fetchEntities()))
			dispatch(fetchMessages()).then(() => {
				dispatch(fetchImages()).then(() => {
					dispatch(getSingleUserScores())
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
		const { checksum } = getState().applicationData
		return getFromApi(`${checksum}/entries.json`, response => {
			if (response.success) {
				dispatch(receiveEntries(response))
				// dispatch(push(`/top_fans/${checksum}`))
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
		const { checksum } = getState().applicationData
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
		const { checksum } = getState().applicationData
		return getExternal(window.messagesUrl).then( json => {
			const defaultMessages = require('modules/top_fans/messages').default
			const messages = { ...defaultMessages, ...json}
			dispatch(receiveMessages(messages))
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
		const { checksum } = getState().applicationData
		return getExternal(window.imagesUrl).then( json => {
			dispatch(receiveImages(json))
			if (json.intro == null) {
				dispatch(push(`/top_fans/${checksum}/scores`))
			}
			return Promise.resolve()
		})
	}
}