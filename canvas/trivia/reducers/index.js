import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/trivia/reducers/applicationData'
import game from 'canvas/trivia/reducers/game'
import settings from 'canvas/trivia/reducers/settings'
import messages from 'canvas/trivia/reducers/messages'
import images from 'canvas/trivia/reducers/images'

// app-specific
import entities from 'canvas/trivia/reducers/entities'
import questions from 'canvas/trivia/reducers/questions'
import answers from 'canvas/trivia/reducers/answers'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		game,
		settings,
		messages,
		images,
		entities,
		// game,
		answers,
	})
}

export default createReducer