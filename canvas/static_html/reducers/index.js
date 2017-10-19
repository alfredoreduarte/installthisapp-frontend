import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/static_html/reducers/applicationData'
import activityIndicators from 'canvas/static_html/reducers/activityIndicators'
import entities from 'canvas/static_html/reducers/entities'
import settings from 'canvas/static_html/reducers/settings'
import messages from 'canvas/static_html/reducers/messages'
import images from 'canvas/static_html/reducers/images'
import loggedUser from 'canvas/static_html/reducers/loggedUser'

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