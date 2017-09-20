import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/top_fans/actions/'
import { writeToApiWithoutAuth, getFromApi } from 'canvas/api'
import Cookies from 'js-cookie'

export const digestFacebookResponse = response => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const body = {
			signed_request: response.signedRequest,
			checksum,
		}
		return writeToApiWithoutAuth(`users.json`, body, response => {
			window.canvasApiKey = response.apiKey
			window.loggedUserId = response.id
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/top_fans/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/top_fans/${checksum}` })
			return dispatch(loginCallback()).then(() => {
				dispatch(getSingleUserScores()).then(() => {
					dispatch(push(`/top_fans/${checksum}/scores`))
				})
			})
		})
	}
}

export const getSingleUserScores = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		return getFromApi(`${checksum}/single_user_scores.json`, response => {
			if (response.success) {
				dispatch({
					type: 'RECEIVE_CURRENT_USER',
					payload: {
						likes: response.likes.length > 0 ? response.likes[0].likes : [],
						comments: response.comments.length > 0 ? response.comments[0].comments : [],
						name: response.name,
						identifier: response.identifier,
					}
				})
			}
		})
	}
}