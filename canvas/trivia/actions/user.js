import 'isomorphic-fetch'
import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/trivia/actions/'
import * as CONFIG from 'config.dev'

export const digestFacebookResponse = response => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		if (response.signedRequest) {
			const url = CONFIG.BASE_URL + '/users.json'
			return fetch(url, {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							signed_request: response.signedRequest,
							checksum,
						})
					})
					.then(response => response.text())
					.then(text =>{
						window.canvasApiKey = text
						dispatch(loginCallback())
					})
					.catch(exception =>
						{
							console.log('Login: parsing failed', exception)
						}
					)
		}
		else{
			console.log('response', response)
		}
	}
}