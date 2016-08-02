import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import entities from './entities'
import settings from './settings'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		entities,
		settings,
	})
}

export default createReducer