import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'

export const receiveImages = payload => {
	return dispatch => {
		dispatch({
			type: 'RECEIVE_IMAGES',
			payload,
		})
		return Promise.resolve(true)
	}
}

export const fetchImages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.imagesUrl).then( json => {
			if (!json.intro || json.intro == "https://s3-us-west-2.amazonaws.com/installthisapp/intro.jpg") {
				return dispatch(receiveImages(json))
				// dispatch(receiveImages(json))
				// return dispatch(push(`/${canvasId}/${checksum}/login`))
				// return dispatch(receiveImages(json)).then(() => dispatch(push(`/${canvasId}/${checksum}/login`)))
			}
			else {
				return dispatch(receiveImages(json))
			}
		})
	}
}