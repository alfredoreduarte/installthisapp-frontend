import { push } from 'react-router-redux'
import { fetchMessages } from 'canvas/trivia/actions/messages'
import { fetchSettings } from 'canvas/trivia/actions/settings'
import { fetchImages } from 'canvas/trivia/actions/images'
import { fetchEntities } from 'canvas/trivia/actions/entities'
import { hasAnsweredAllQuestions } from 'canvas/trivia/selectors/questions'
import { toggleActivityIndicator } from 'canvas/trivia/actions/activityIndicators'
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
		writeToApiWithoutAuth(`users.json`, body).then( response => {
			window.canvasApiKey = response.apiKey
			window.loggedUserId = response.id
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/${canvasId}/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/${canvasId}/${checksum}` })
			return dispatch(loginCallback())
		})
	}
}

export const loginCallback = () => {
	return (dispatch, getState) => 	
		dispatch(fetchEntities())
		.then(() => {
			dispatch(toggleActivityIndicator())
			const state = getState()
			const { checksum, canvasId } = state.applicationData
			if (!hasAnsweredAllQuestions(state)) {
				console.log('hay preguntas disponibles')
				dispatch(push(`/${canvasId}/${checksum}/questions`))
			}
			else{
				console.log('NO hay preguntas disponibles')
				dispatch(push(`/${canvasId}/${checksum}/already-played`))
			}
		})
// return dispatch => 	dispatch(fetchSettings())
		// .then(() => dispatch(fetchMessages()))
		// .then(() => dispatch(fetchImages()))
		// .then(() => dispatch(fetchEntities()))
}