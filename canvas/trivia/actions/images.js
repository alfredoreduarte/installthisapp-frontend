import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'

export const receiveImages = payload => ({
	type: 'RECEIVE_IMAGES',
	payload,
})

export const fetchImages = redirectIfNoIntro => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.imagesUrl).then( json => {
			if (!json.intro && redirectIfNoIntro) {
				dispatch(push(`/${canvasId}/${checksum}${redirectIfNoIntro}`))
			}
			return dispatch(receiveImages(json))
		})
	}
}