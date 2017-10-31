import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/capture_the_flag/reducers/applicationData'
import activityIndicators from 'canvas/capture_the_flag/reducers/activityIndicators'
import entities from 'canvas/capture_the_flag/reducers/entities'
import settings from 'canvas/capture_the_flag/reducers/settings'
import messages from 'canvas/capture_the_flag/reducers/messages'
import images from 'canvas/capture_the_flag/reducers/images'
import loggedUser from 'canvas/capture_the_flag/reducers/loggedUser'

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
