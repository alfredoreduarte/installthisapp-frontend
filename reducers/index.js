import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'reducers/entities'
import admin from 'reducers/admin'
import selectedUserIds from 'reducers/selectedUserIds'
import filterText from 'reducers/filterText'
import usersSorting from 'reducers/usersSorting'
import appsSorting from 'reducers/appsSorting'
import newApp from 'reducers/newApp'
import deleteApp from 'reducers/deleteApp'

const rootReducer = combineReducers({
	routing,
	filterText,
	usersSorting,
	appsSorting,
	selectedUserIds,
	admin,
	newApp,
	deleteApp,
	entities,
	form: formReducer
})

export default rootReducer