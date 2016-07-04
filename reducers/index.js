import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import admin from 'reducers/admin'
import apps from 'reducers/apps'
import users from 'reducers/users'
import pages from 'reducers/pages'
import selectedUserIds from 'reducers/selectedUserIds'
import filterText from 'reducers/filterText'
import usersSorting from 'reducers/usersSorting'

const entities = combineReducers({
	apps,
	users,
	pages
})

const rootReducer = combineReducers({
	routing,
	filterText,
	usersSorting,
	selectedUserIds,
	admin,
	entities,
	form: formReducer
})

export default rootReducer