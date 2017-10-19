import { getFromApi, getExternal } from 'canvas/api'

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
				return dispatch(receiveImages(json))
			})
		}
	}
}