import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/fan_gate/reducers/applicationData'
import activityIndicators from 'canvas/fan_gate/reducers/activityIndicators'
import entities from 'canvas/fan_gate/reducers/entities'
import settings from 'canvas/fan_gate/reducers/settings'
import messages from 'canvas/fan_gate/reducers/messages'
import images from 'canvas/fan_gate/reducers/images'
import loggedUser from 'canvas/fan_gate/reducers/loggedUser'

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