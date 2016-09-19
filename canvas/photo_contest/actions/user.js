import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/photo_contest/actions/'
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
			// window.canvasApiKey = response.apiKey
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: '' })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: '' })
			dispatch(loginCallback()).then(() => {
				dispatch(logUserIn(response.id))
				if (redirectUri) {
					dispatch(push(redirectUri))
				}
				else {
					dispatch(push(`/${canvasId}/${checksum}`))
				}
			})
		})
	}
}