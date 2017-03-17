import { getFromApi, getExternal } from 'canvas/api'

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

export const fetchMessages = () => {
	return (dispatch, getState) => {
		return getExternal(window.messagesUrl).then( json => dispatch(receiveMessages(json)))
	}
}