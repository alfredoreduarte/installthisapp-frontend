import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/photo_contest/actions/'
import { writeToApiWithoutAuth } from 'canvas/api'
import Cookies from 'js-cookie'

export const logIn = payload => ({
	type: 'LOG_USER_IN',
	payload,
})

export const digestFacebookResponse = (response, redirectUri) => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { signedRequest } = response.tokenDetail
		const body = {
			signedRequest,
			checksum,
		}
		return writeToApiWithoutAuth(`users.json`, body, response => {
			window.canvasApiKey = response.apiKey
			window.loggedUserId = response.id
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/photo_contest/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/photo_contest/${checksum}` })
			Cookies.set('loggedUserIdentifier', response.identifier, { expires: 7, path: `/photo_contest/${checksum}` })
			Cookies.set('loggedUserName', response.name, { expires: 7, path: `/photo_contest/${checksum}` })
			return dispatch(loginCallback()).then(() => {
				// dispatch(logIn(response)).then(() => dispatch(push(`/photo_contest/${checksum}/upload`)))
				return dispatch(logIn(response))
			})
		})
	}
}
