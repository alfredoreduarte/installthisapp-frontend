import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config.dev'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'
import Cookies from 'js-cookie'

export const deleteQuestion = id => ({
	type: 'TRIVIA/DELETE_QUESTION',
	id
})

export const postDeleteQuestions = (checksum, ids) => {
	return dispatch => {
		const url = CONFIG.BASE_URL + `/applications/${checksum}/questions_destroy.json`
		const api_key = Cookies.get('api_key')
		return 	fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						'Content-Type': `application/json`,
					},
					body: JSON.stringify({
						id: ids
					})
				})
				.then(response => response.json())
				.then(json =>{
					ids.map(id => dispatch(deleteQuestion(id)))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const postNewQuestion = (checksum, newQuestion) => {
	const url = CONFIG.BASE_URL + `/applications/${checksum}/questions_create.json`
	const api_key = Cookies.get('api_key')
	const options_attributes = newQuestion.options.map(option => {
		return {
			text: option.text,
			correct: option.correct,
		}
	})
	const newQuestionData = {
		question: {
			text: newQuestion.text,
			options_attributes,
		}
	}
	return (dispatch, getState) => {
		return fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						'Content-Type': `application/json`,
					},
					body: JSON.stringify(newQuestionData)
				})
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.question)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}