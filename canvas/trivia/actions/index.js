import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import * as schema from 'canvas/trivia/schema'
import { 
	hasAnsweredAllQuestions, 
	allQuestions, 
	allOptions,
} from 'canvas/trivia/selectors/questions'
import { getFromApi, postToApi, getExternal } from 'canvas/api'

// 
// FIX NEEDED!: Ahora mismo settings.done es un parche feo para no hacer submit dos veces, porque el state
// se actualiza asincronamente y no tenemos callback para saber cuando se terminaron de responder
// las preguntas
// Tip: sucede al dejar el tiempo corriendo y que se marquen todas como incorrectas
// 
const prePostAnswers = () => {
	return (dispatch, getState) => {
		if (!getState().settings.done) {
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
const handleUnansweredQuestions = () => {
	return (dispatch, getState) => {
		const questions = allQuestions(getState())
		const options = allOptions(getState())
		const unansweredQuestionsArray = []
		questions.map(q => {
			if (!q.answered) {
				unansweredQuestionsArray.push(q.id)
			}
		})
		unansweredQuestionsArray.map(id => {
			const singleQuestion = _.find(questions, {id})
			const option = _.find(options, o => !o.correct && singleQuestion.options.indexOf(o.id) > -1 )
			dispatch(saveAnswer(id, option.id, false))
		})
	}
}
export const advanceCountDown = () => {
	return (dispatch, getState) => {
		const { timeOut } = getState().settings
		if ( timeOut == 1 ) {
			if ( hasAnsweredAllQuestions(getState()) ) {
				dispatch(prePostAnswers())
			}
			else {
				dispatch(handleUnansweredQuestions())
				dispatch(toggleCountDown())
			}
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

export const receiveMessages = payload => ({
	type: 'RECEIVE_MESSAGES',
	payload,
})

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
		return dispatch(fetchMessages()).then(() => dispatch(fetchEntities()))
	}
}

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/jsontest.json`).then( json => {
			const payload = normalize(json.payload, schema.payload)
			const settings = json.settings
			const isEmpty = _.isEmpty(payload.entities.questions)
			if (!isEmpty) {
				dispatch(receiveEntities(payload.entities))
				dispatch(receiveGameSettings(settings))
				dispatch(toggleActivityIndicator())
				if (_.filter(payload.entities.questions, { 'answered': false }).length == 0) {
					dispatch(push(`/${canvasId}/${checksum}/thanks`))
				}
				else{
					dispatch(push(`/${canvasId}/${checksum}`))
					dispatch(toggleCountDown())
				}
			}
			else {
				dispatch(push(`/${canvasId}/${checksum}/already-played`))
			}
		})
	}
}

export const fetchMessages = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		console.log('va a traer de aca', window.messagesUrl)
		return getExternal(window.messagesUrl).then( json => {
			dispatch(receiveMessages(json))
			return Promise.resolve()
		})
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