import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import entities from './entities'
import answeredQuestions from './answeredQuestions'
import answers from './answers'
import settings from './settings'

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