import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/photo_contest/actions/'
import { photosByUploaderId } from 'canvas/photo_contest/selectors/photos'
import { writeToApiWithoutAuth } from 'canvas/api'
import Cookies from 'js-cookie'

export const logUserIn = payload => ({
	type: 'LOG_USER_IN',
	payload,
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
			window.loggedUserId = response.id
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/${canvasId}/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/${canvasId}/${checksum}` })
			Cookies.set('loggedUserIdentifier', response.identifier, { expires: 7, path: `/${canvasId}/${checksum}` })
			Cookies.set('loggedUserName', response.name, { expires: 7, path: `/${canvasId}/${checksum}` })
			dispatch(loginCallback()).then(() => {
				dispatch(logUserIn(response))
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