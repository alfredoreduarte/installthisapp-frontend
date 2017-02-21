import { getFromApi, getExternal } from 'canvas/api'

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.messagesUrl).then( json => {
			return dispatch(receiveMessages(json))
			// return Promise.resolve()
		})
	}
}