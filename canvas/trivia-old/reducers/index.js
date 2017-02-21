import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/trivia/reducers/applicationData'
import entities from 'canvas/trivia/reducers/entities'
// import questions from 'canvas/trivia/reducers/questions'
import answers from 'canvas/trivia/reducers/answers'
import settings from 'canvas/trivia/reducers/settings'
import game from 'canvas/trivia/reducers/game'
import messages from 'canvas/trivia/reducers/messages'
import images from 'canvas/trivia/reducers/images'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		entities,
		// questions,
		answers,
		settings,
		game,
		messages,
		images,
	})
}

export default createReducer