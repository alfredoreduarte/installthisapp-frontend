import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/trivia/actions/'
import { writeToApiWithoutAuth } from 'canvas/api'
import Cookies from 'js-cookie'

export const digestFacebookResponse = response => {
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
			dispatch(loginCallback())
		})
	}
}