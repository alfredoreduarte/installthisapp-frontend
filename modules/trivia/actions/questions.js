import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import * as CONFIG from 'config.dev'
import { receiveTriviaEntities } from 'modules/trivia/actions/entities'

export const deleteQuestion = id => ({
	type: 'TRIVIA/DELETE_QUESTION',
	id
})

export const postDeleteQuestions = ids => {
	return dispatch => {
		const url = CONFIG.BASE_URL + `/trivia/questions/delete`
		// const url = `/apps/delete/${checksum}`
		return 	fetch(url, {
					method: 'POST',
					body: ids
				})
				.then(response => response.json())
				.then(json =>{
					console.log('se borro', json)
					ids.map(id => dispatch(deleteQuestion(id)))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const postNewQuestion = (newQuestion) => {
	const url = CONFIG.BASE_URL + `/trivia/questions/create`
	console.log('data', newQuestion)
	const newQuestionData = newQuestion || {
		text: 'new question',
		options: [
			{
				text: 'option 1',
				correct: false,
			},
			{
				text: 'option 2',
				correct: true,
			}
		]
	}
	// const url = '/apps/create'
	return (dispatch, getState) => {
		// const newAppData = getState().newApp
		return fetch(url, {
					method: 'POST',
					body: newQuestionData
				})
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.question)
					console.log(normalized)
					dispatch(receiveTriviaEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}