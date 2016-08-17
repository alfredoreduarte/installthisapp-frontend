import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/trivia/reducers/applicationData'
import entities from 'canvas/trivia/reducers/entities'
import answeredQuestions from 'canvas/trivia/reducers/answeredQuestions'
import answers from 'canvas/trivia/reducers/answers'
import settings from 'canvas/trivia/reducers/settings'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		entities,
		answeredQuestions,
		answers,
		settings,
	})
}

export default createReducer