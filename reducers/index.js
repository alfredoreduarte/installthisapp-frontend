import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import admin from './admin'
import apps from './apps'
import users from './users'
import pages from './pages'
import selectedUserIds from './selectedUserIds'
import filterText from './filterText'

const entities = combineReducers({
	apps,
	users,
	pages
})

const rootReducer = combineReducers({
	routing,
	filterText,
	selectedUserIds,
	admin,
	entities,
	form: formReducer
})

export default rootReducer