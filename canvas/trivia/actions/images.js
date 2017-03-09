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
			if (!json.intro || json.intro == "https://s3-us-west-2.amazonaws.com/installthisapp/intro.jpg") {
				if (redirectIfNoIntro) {
					dispatch(push(`/${canvasId}/${checksum}${redirectIfNoIntro}`))
				}
				else {
					dispatch(push(`/${canvasId}/${checksum}/login`))	
				}
			}
			return dispatch(receiveImages(json))
		})
	}
}