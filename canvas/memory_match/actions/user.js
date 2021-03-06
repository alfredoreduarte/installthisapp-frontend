import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/memory_match/actions/'
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
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/memory_match/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/memory_match/${checksum}` })
			Cookies.set('loggedUserIdentifier', response.identifier, { expires: 7, path: `/memory_match/${checksum}` })
			Cookies.set('loggedUserName', response.name, { expires: 7, path: `/memory_match/${checksum}` })
			dispatch(loginCallback()).then(() => {
				dispatch(logIn(response))
				dispatch(push(`/memory_match/${checksum}/game`))
			})
		})
	}
}