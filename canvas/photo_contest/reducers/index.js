import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/photo_contest/reducers/applicationData'
import entities from 'canvas/photo_contest/reducers/entities'
import settings from 'canvas/photo_contest/reducers/settings'
import messages from 'canvas/photo_contest/reducers/messages'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		entities,
		settings,
		messages,
	})
}

export default createReducer