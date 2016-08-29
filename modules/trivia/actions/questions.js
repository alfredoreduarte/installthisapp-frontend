import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'
import humps from 'humps'
import Cookies from 'js-cookie'

export const deleteQuestion = id => ({
	type: 'TRIVIA/DELETE_QUESTION',
	id
})

export const postDeleteQuestions = (checksum, ids) => {
	return dispatch => {
		const url = CONFIG.API_URL + `/applications/${checksum}/questions_destroy.json`
		const api_key = Cookies.get('api_key')
		return 	fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						'Content-Type': `application/json`,
						'Accept': 'application/json',
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
	let url
	if (newQuestion.id) {
		url = CONFIG.API_URL + `/applications/${checksum}/questions_update.json`
	}
	else{
		url = CONFIG.API_URL + `/applications/${checksum}/questions_create.json`
	}
	const api_key = Cookies.get('api_key')
	const options_attributes = newQuestion.options.map(option => {
		const optionId = newQuestion.id && parseInt(option.id) == option.id ? option.id : null
		const destroy = option._destroy ? option._destroy : false
		return {
			text: option.text,
			id: optionId,
			correct: option.correct,
			_destroy: destroy,
		}
	})
	const newQuestionData = {
		question: {
			text: newQuestion.text,
			id: newQuestion.id,
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
					const camelizedJson = humps.camelizeKeys(json)
					const normalized = normalize(camelizedJson, schema.entities)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}