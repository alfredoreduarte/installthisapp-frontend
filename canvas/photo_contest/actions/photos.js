import { postFileToApi } from 'canvas/api'
import { togglePhotoUploadIndicator } from 'canvas/photo_contest/actions/activityIndicators'

export const postPhoto = body => {
	return (dispatch, getState) => {
		dispatch(togglePhotoUploadIndicator())
		const { checksum } = getState().applicationData
		return postFileToApi(`${checksum}/upload.json`, body)
				.then(response => {
					dispatch(togglePhotoUploadIndicator())
					return Promise.resolve(response)
				})
	}
}