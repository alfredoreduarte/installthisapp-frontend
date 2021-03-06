import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import applicationData from 'canvas/catalog/reducers/applicationData'
import activityIndicators from 'canvas/catalog/reducers/activityIndicators'
import entities from 'canvas/catalog/reducers/entities'
import settings from 'canvas/catalog/reducers/settings'
import messages from 'canvas/catalog/reducers/messages'
import images from 'canvas/catalog/reducers/images'
import loggedUser from 'canvas/catalog/reducers/loggedUser'
import ui from 'canvas/catalog/reducers/ui'

const createReducer = asyncReducers => {
	return combineReducers({
		form: formReducer,
		routing,
		applicationData,
		activityIndicators,
		entities,
		settings,
		messages,
		images,
		loggedUser,
		ui,
	})
}

export default createReducer