import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import applicationData from 'canvas/promo_code/reducers/applicationData'
import activityIndicators from 'canvas/promo_code/reducers/activityIndicators'
import entities from 'canvas/promo_code/reducers/entities'
import settings from 'canvas/promo_code/reducers/settings'
import messages from 'canvas/promo_code/reducers/messages'
import images from 'canvas/promo_code/reducers/images'
import loggedUser from 'canvas/promo_code/reducers/loggedUser'

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
