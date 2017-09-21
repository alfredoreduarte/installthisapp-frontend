import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/top_fans/schema'
import { getFromApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'

export const removeTopFansEntities = () => {
	return {
		type: 'TOP_FANS/REMOVE_ENTITIES'
	}
}

export const receiveTopFansDetails = (senderId, payload) => {
	return {
		type: 'TOP_FANS/RECEIVE_DETAILS',
		senderId: senderId,
		payload: payload,
	}
}

export const fetchTopFansDetails = senderId => {
	return (dispatch, getState) => {
		const checksum = getCurrentAppByState(getState()).checksum
		return getFromApi(`applications/${checksum}/detail_by_user_and_page.json?sender_id=${senderId}`)
		.then( response => {
			dispatch(receiveTopFansDetails(response.payload.user.senderId, {
				name: response.payload.user.senderName,
				likes: response.payload.likes,
				comments: response.payload.comments,
			}))
		})
	}
}

export const receiveTopFansEntities = (entities, applicationLog) => {
	return {
		type: 'TOP_FANS/RECEIVE_ENTITIES',
		response: {
			entities,
			applicationLog,
		}
	}
}

export const fetchTopFansEntities = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/entries.json`).then( response => {
			if (response.status) {
				dispatch(receiveTopFansEntities(response.payload, response.applicationLog))
			}
			else {
				dispatch(receiveTopFansEntities(null, response.applicationLog))
				console.log('app is not subscribed to any page')
			}
		})
}

export const beforeShowingDashboard = fetchTopFansEntities

export const pollTopFansEntities = checksum => {
	return dispatch => {
		setInterval(() => {
			dispatch(fetchTopFansEntities(checksum))
		}, 3500)
	}
}

export const receiveTopFansSettings = payload => ({
	type: 'TOP_FANS/RECEIVE_SETTINGS',
	payload,
})

export const fetchTopFansSettings = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/settings.json`).then( response => {
			dispatch(receiveTopFansSettings(response))
		})
}

export const cleanupTopFansEntities = () => {
	return (dispatch, getState) => {
		const checksum = getCurrentAppByState(getState()).checksum
		return getFromApi(`applications/${checksum}/reset_scores_for_page.json`).then( response => {
			if (response.status) {
				dispatch(receiveTopFansEntities(response.payload))
				// dispatch(fetchTopFansSettings(checksum))
			}
			else{
				console.log('error: ', response)
			}
		})
	}
}

export const resetTopFansEntities = () => {
	return (dispatch, getState) => {
		dispatch(removeTopFansEntities())
		const checksum = getCurrentAppByState(getState()).checksum
		return getFromApi(`applications/${checksum}/reset.json`).then( response => {
			if (response.status) {
				return dispatch(receiveTopFansEntities(response.payload))
				// dispatch(fetchTopFansSettings(checksum))
			}
			else{
				console.log('error: ', response)
			}
		})
	}
}