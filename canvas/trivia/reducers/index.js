import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/trivia/reducers/applicationData'
import entities from 'canvas/trivia/reducers/entities'
// import questions from 'canvas/trivia/reducers/questions'
import answers from 'canvas/trivia/reducers/answers'
import settings from 'canvas/trivia/reducers/settings'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		entities,
		// questions,
		answers,
		settings,
	})
}

export default createReducer