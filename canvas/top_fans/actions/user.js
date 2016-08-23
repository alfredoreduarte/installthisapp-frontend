import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/top_fans/actions/'
import { writeToApiWithoutAuth } from 'canvas/api'

export const digestFacebookResponse = response => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const body = {
			signed_request: response.signedRequest,
			checksum,
		}
		writeToApiWithoutAuth(`users.json`, body, response => {
			window.canvasApiKey = response.api_key
			dispatch(loginCallback())
		})
	}
}