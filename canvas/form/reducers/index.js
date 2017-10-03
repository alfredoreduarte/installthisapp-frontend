import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import applicationData from 'canvas/form/reducers/applicationData'
import activityIndicators from 'canvas/form/reducers/activityIndicators'
import entities from 'canvas/form/reducers/entities'
import settings from 'canvas/form/reducers/settings'
import messages from 'canvas/form/reducers/messages'
import images from 'canvas/form/reducers/images'
import loggedUser from 'canvas/form/reducers/loggedUser'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		activityIndicators,
		form: formReducer,
		entities,
		settings,
		messages,
		images,
		loggedUser,
	})
}

export default createReducer