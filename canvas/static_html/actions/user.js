import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/static_html/actions/'
import { writeToApiWithoutAuth } from 'canvas/api'
import Cookies from 'js-cookie'

export const logIn = payload => ({
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
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/static_html/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/static_html/${checksum}` })
			Cookies.set('loggedUserIdentifier', response.identifier, { expires: 7, path: `/static_html/${checksum}` })
			Cookies.set('loggedUserName', response.name, { expires: 7, path: `/static_html/${checksum}` })
			dispatch(loginCallback()).then(() => {
				dispatch(logIn(response)).then(() => dispatch(push(`/static_html/${checksum}/entries`)))				
			})
		})
	}
}