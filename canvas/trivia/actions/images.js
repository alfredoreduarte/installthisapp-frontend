import { getFromApi, getExternal } from 'canvas/api'

export const receiveImages = payload => ({
	type: 'RECEIVE_IMAGES',
	payload,
})

export const fetchImages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getExternal(window.imagesUrl).then( json => {
			return dispatch(receiveImages(json))
			// if (json.intro == null) {
				// dispatch(push(`/${canvasId}/${checksum}/scores`))
			// }
			// return Promise.resolve()
		})
	}
}