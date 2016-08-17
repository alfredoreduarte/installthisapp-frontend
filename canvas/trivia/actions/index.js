import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import * as schema from 'canvas/trivia/schema'
import { hasAnsweredAllQuestions, allQuestions, allOptions, answeredQuestions } from 'canvas/trivia/selectors/questions'
import * as CONFIG from 'config.dev'
import humps from 'humps'

const prePostAnswers = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityIndicator())
		dispatch(postAnswers())
			.then(success => {
				dispatch(toggleActivityIndicator())
				dispatch(push(`/${window.canvasId}/${window.checksum}/thanks`))
			}, failure => {
				console.log('FAILURE', failure)
			}
		)
	}
}
const handleUnansweredQuestions = () => {
	return (dispatch, getState) => {
		const questions = allQuestions(getState())
		const options = allOptions(getState())
		const answeredQuestionsArray = answeredQuestions(getState())
		questions.map(q => {
			if (answeredQuestionsArray.indexOf(q.id) < 0) {
				const option = _.find(options, o => {
					if (o.correct == false && q.options.indexOf(o.id) > -1) {
						return o
					}
				})
				dispatch(saveAnswer(q.id, option.id, false))
			}
		})
	}
}
export const advanceCountDown = () => {
	return (dispatch, getState) => {
		const { timeOut } = getState().settings
		if (timeOut == 0) {
			hasAnsweredAllQuestions(getState()) ? dispatch(prePostAnswers()) : dispatch(handleUnansweredQuestions())
		}
		else{
			dispatch({
				type: 'COUNTDOWN_PROGRESS'
			})
		}
	}
}

export function toggleActivityIndicator(){
	return {
		type: 'TOGGLE_ACTIVITY_INDICATOR'
	}
}

export function toggleCountDown(){
	return {
		type: 'TOGGLE_COUNTDOWN'
	}
}

// export function answerQuestion(id){
// 	return {
// 		type: 'ANSWER_QUESTION',
// 		id
// 	}
// }
// 

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const receiveGameSettings = settings => ({
	type: 'RECEIVE_SETTINGS',
	settings,
})

export const loginCallback = () => {
	return dispatch => {
		dispatch(fetchEntities())
	}
}

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		const url = CONFIG.BASE_URL + `/${checksum}/canvas_entities.json`
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
						const normalized = normalize(camelizedJson, schema.entities)
						if (Object.keys(normalized.entities.questions).length) {
							dispatch(receiveEntities(normalized.entities))
							dispatch(receiveGameSettings(camelizedJson.settings))
							dispatch(push(`/${canvasId}/${checksum}`))
							dispatch(toggleActivityIndicator())
							dispatch(toggleCountDown())
						}
						else{
							// no hay preguntas
						}
					}
					else if (json.status == 'already_answered') {
						// no hay preguntas
						dispatch(push(`/${canvasId}/${checksum}/already-played`))
					}
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const saveAnswer = (questionId, optionId, correct) =>{
	return (dispatch, getState) => {
		dispatch({
			type: 'ANSWER_QUESTION',
			id: questionId		
		})
		dispatch({
			type: 'SAVE_ANSWER',
			payload: {
				questionId,
				optionId,
				correct
			}
		})
		if (hasAnsweredAllQuestions(getState())) {dispatch(prePostAnswers())}
	}
}

export const postAnswers = () => {
	return (dispatch, getState) => {
		const checksum = getState().applicationData.checksum
		const body = {
			answers: getState().answers
		}
		const url = CONFIG.BASE_URL + `/${checksum}/save.json`
		return fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${window.canvasApiKey}"`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body)
				})
				.then(response => response.json())
				.then(json =>{
					console.log('answers posted and received', json)
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}