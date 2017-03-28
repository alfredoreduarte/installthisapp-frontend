import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/memory_match/reducers/applicationData'
import activityIndicators from 'canvas/memory_match/reducers/activityIndicators'
import game from 'canvas/memory_match/reducers/game'
import entities from 'canvas/memory_match/reducers/entities'
import settings from 'canvas/memory_match/reducers/settings'
import messages from 'canvas/memory_match/reducers/messages'
import images from 'canvas/memory_match/reducers/images'
import loggedUser from 'canvas/memory_match/reducers/loggedUser'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		activityIndicators,
		game,
		entities,
		settings,
		messages,
		images,
		loggedUser,
	})
}

export default createReducer