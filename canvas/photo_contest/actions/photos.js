import { postFileToApi } from 'canvas/api'

export const postPhoto = body => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		return postFileToApi(`${checksum}/upload.json`, body)
				.then(response => {
					return Promise.resolve(response)
				})
	}
}