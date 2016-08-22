import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
// import * as schema from 'canvas/trivia/schema'
// import { hasAnsweredAllQuestions, allQuestions, allOptions, answeredQuestions } from 'canvas/trivia/selectors/questions'
import * as CONFIG from 'config.dev'
import humps from 'humps'

export const loginCallback = () => {
	return dispatch => {
		// dispatch(fetchEntities())
		console.log('login callback')
	}
}