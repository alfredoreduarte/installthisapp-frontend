import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/trivia/actions/'
import { writeToApiWithoutAuth } from 'canvas/api'

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
			dispatch(loginCallback())
		})
	}
}