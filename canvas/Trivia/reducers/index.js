import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'canvas/trivia/reducers/entities'
import answeredQuestions from 'canvas/trivia/reducers/answeredQuestions'
import answers from 'canvas/trivia/reducers/answers'
import settings from 'canvas/trivia/reducers/settings'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		entities,
		answeredQuestions,
		answers,
		settings,
	})
}

export default createReducer