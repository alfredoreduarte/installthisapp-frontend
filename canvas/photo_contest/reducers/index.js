import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/photo_contest/reducers/applicationData'
import activityIndicators from 'canvas/photo_contest/reducers/activityIndicators'
import entities from 'canvas/photo_contest/reducers/entities'
import settings from 'canvas/photo_contest/reducers/settings'
import messages from 'canvas/photo_contest/reducers/messages'
import sort from 'canvas/photo_contest/reducers/sort'
import search from 'canvas/photo_contest/reducers/search'
import loggedUser from 'canvas/photo_contest/reducers/loggedUser'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		activityIndicators,
		entities,
		settings,
		messages,
		sort,
		search,
		loggedUser,
	})
}

export default createReducer