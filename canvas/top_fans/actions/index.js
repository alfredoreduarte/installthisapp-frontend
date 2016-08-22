import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
// import * as schema from 'canvas/trivia/schema'
// import { hasAnsweredAllQuestions, allQuestions, allOptions, answeredQuestions } from 'canvas/trivia/selectors/questions'
import * as CONFIG from 'config.dev'
import humps from 'humps'

export const loginCallback = () => {
	return dispatch => {
		dispatch(fetchEntities())
		// console.log('login callback')
	}
}

export const receiveLikes = entities => ({
	type: 'RECEIVE_LIKES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		const url = CONFIG.BASE_URL + `/${checksum}/likes.json`
		return fetch(url, {
					method: 'GET',
					headers: {
						'Authorization': `Token token="${window.canvasApiKey}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					if (json.status == 'ok') {
						const camelizedJson = humps.camelizeKeys(json)
						console.log('data')
						console.log(camelizedJson)
						// const normalized = normalize(camelizedJson, schema.entities)
						// if (Object.keys(normalized.entities.questions).length) {
						// 	dispatch(receiveEntities(normalized.entities))
						// 	dispatch(receiveGameSettings(camelizedJson.settings))
							dispatch(receiveLikes(camelizedJson.likes))
							dispatch(push(`/${canvasId}/${checksum}`))
						// 	dispatch(toggleActivityIndicator())
						// 	dispatch(toggleCountDown())
						// }
					}
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}