import { push } from 'react-router-redux'
import { postToApi } from 'canvas/api'
import { 
	hasAnsweredAllQuestions, 
	allQuestions, 
	allOptions,
} from 'canvas/trivia/selectors/questions'

import { toggleActivityIndicator } from 'canvas/trivia/actions/activityIndicators'

export const handleUnansweredQuestions = () => {
	return (dispatch, getState) => {
		const questions = allQuestions(getState())
		const options = allOptions(getState())
		const unansweredQuestionsArray = []
		console.log('handling unanswered')
		console.log(questions)
		console.log(options)
		questions.map(q => {
			if (!q.answered) {
				unansweredQuestionsArray.push(q.id)
			}
		})
		unansweredQuestionsArray.map(id => {
			const singleQuestion = _.find(questions, {id})
			// const option = _.find(options, o => !o.correct && singleQuestion.options.indexOf(o.id) > -1 )
			// dispatch(saveAnswer(id, option.id, false))
			dispatch(saveAnswer(id, null, false))
		})
	}
}

// 
// FIX NEEDED!: Ahora mismo settings.done es un parche feo para no hacer submit dos veces, porque el state
// se actualiza asincronamente y no tenemos callback para saber cuando se terminaron de responder
// las preguntas
// Tip: sucede al dejar el tiempo corriendo y que se marquen todas como incorrectas
// 
const prePostAnswers = () => {
	return (dispatch, getState) => {
		if (!getState().game.done) {
			dispatch({
				type: 'TOGGLE_DONE'
			})
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
}

export const saveAnswer = (questionId, optionId, correct) =>{
	return (dispatch, getState) => {
		if ( hasAnsweredAllQuestions(getState()) ) {
			dispatch(prePostAnswers())
		}
		else {
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
		}
	}
}

export const postAnswers = () => {
	return (dispatch, getState) => {
		const checksum = getState().applicationData.checksum
		const body = {
			answers: getState().answers
		}
		return postToApi(`${checksum}/save.json`, body).then( json => {
			console.log('answers posted and received', json)
		})
	}
}