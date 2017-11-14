import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/example/reducers/applicationData'
import activityIndicators from 'canvas/example/reducers/activityIndicators'
import entities from 'canvas/example/reducers/entities'
import settings from 'canvas/example/reducers/settings'
import messages from 'canvas/example/reducers/messages'
import images from 'canvas/example/reducers/images'
import loggedUser from 'canvas/example/reducers/loggedUser'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		activityIndicators,
		entities,
		settings,
		messages,
		images,
		loggedUser,
	})
}

export default createReducer
