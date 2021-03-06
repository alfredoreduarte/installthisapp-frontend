import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/trivia/schema'
import { receiveEntities } from 'modules/trivia/actions/entities'
import { getFromApi, postToApi, deleteFromApi } from 'api'

export const deleteQuestion = id => ({
	type: 'TRIVIA/DELETE_QUESTION',
	id
})

export const postDeleteQuestions = (checksum, ids) => {
	return dispatch => {
		return 	deleteFromApi(`applications/${checksum}/questions_destroy.json`,
					{
						id: ids
					}
				)
				.then(response =>{
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
		url = `applications/${checksum}/questions_update.json`
	}
	else{
		url = `applications/${checksum}/questions_create.json`
	}
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
		return postToApi(url, newQuestionData)
				.then(response => {
					const normalized = normalize(response, schema.entities)
					dispatch(receiveEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const postNewQuestionWithReduxForm = () => {
	return (dispatch, getState) => {
		const question = getState().form.triviaQuestionCreator.values
		const checksum = getState().admin.currentApp
		console.log('la question')
		console.log(question)
		let url
		if (question.id) {
			url = `applications/${checksum}/questions_update.json`
		}
		else{
			url = `applications/${checksum}/questions_create.json`
		}
		return postToApi(url, { 
			question: {
				text: question.text,
				id: question.id,
				options_attributes: question.options,
			}
		})
		.then(response => {
			const normalized = normalize(response, schema.entities)
			dispatch(receiveEntities(normalized.entities))
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}