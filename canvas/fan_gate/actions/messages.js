import { getFromApi, getExternal } from 'canvas/api'

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const { fetched } = getState().messages
		if (fetched) {
			return Promise.resolve(true)
		}
		else {
			return getExternal(window.messagesUrl).then( json => dispatch(receiveMessages(json)))
		}
	}
}