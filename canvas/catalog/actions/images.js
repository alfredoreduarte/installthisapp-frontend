import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'

export const receiveImages = payload => ({
	type: 'RECEIVE_IMAGES',
	payload,
})

export const fetchImages = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { fetched } = getState().images
		if (fetched) {
			return Promise.resolve(true)
		}
		else {
			return getExternal(window.imagesUrl).then( json => {
				// if (!json.intro || json.intro == "https://s3-us-west-2.amazonaws.com/installthisapp/intro.jpg") {
					// dispatch(push(`/catalog/${checksum}`))
				// }
				return dispatch(receiveImages(json))
			})
		}
	}
}