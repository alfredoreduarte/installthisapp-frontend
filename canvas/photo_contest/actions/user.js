import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/photo_contest/actions/'
import { photosByUploaderId } from 'canvas/photo_contest/selectors/photos'
import { writeToApiWithoutAuth } from 'canvas/api'
import Cookies from 'js-cookie'

export const logUserIn = id => ({
	type: 'LOG_USER_IN',
	id
})

export const digestFacebookResponse = (response, redirectUri) => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { signedRequest } = response
		const body = {
			signedRequest,
			checksum,
		}
		writeToApiWithoutAuth(`users.json`, body, response => {
			window.canvasApiKey = response.apiKey
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/${canvasId}/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/${canvasId}/${checksum}` })
			dispatch(loginCallback()).then(() => {
				dispatch(logUserIn(response.id))
				const canUpload = photosByUploaderId(getState()).length == 0
				if (redirectUri && canUpload) {
					dispatch(push(redirectUri))
				}
				else {
					dispatch(push(`/${canvasId}/${checksum}`))
				}
			})
		})
	}
}