import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/photo_contest/reducers/applicationData'
import activityIndicators from 'canvas/photo_contest/reducers/activityIndicators'
import entities from 'canvas/photo_contest/reducers/entities'
import settings from 'canvas/photo_contest/reducers/settings'
import messages from 'canvas/photo_contest/reducers/messages'
import images from 'canvas/photo_contest/reducers/images'
import loggedUser from 'canvas/photo_contest/reducers/loggedUser'

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
		form: formReducer,
	})
}

export default createReducer
