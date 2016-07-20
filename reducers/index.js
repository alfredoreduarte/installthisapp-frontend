import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'reducers/entities'
import admin from 'reducers/admin'
import selectedItems from 'reducers/selectedItems'
import filterText from 'reducers/filterText'
import usersSorting from 'reducers/usersSorting'
import appsSorting from 'reducers/appsSorting'
import newApp from 'reducers/newApp'
import deleteApp from 'reducers/deleteApp'
import styles from 'reducers/styles'
import mouseTrap from 'reducers/design-helper/mouseTrap'

// Modules
import trivia from 'modules/trivia/reducers/'

// const rootReducer = combineReducers({
// 	routing,
// 	filterText,
// 	usersSorting,
// 	appsSorting,
// 	selectedItems,
// 	admin,
// 	newApp,
// 	deleteApp,
// 	entities,
// 	styles,
// 	mouseTrap,
// 	form: formReducer
// })

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		filterText,
		usersSorting,
		appsSorting,
		selectedItems,
		admin,
		newApp,
		deleteApp,
		entities,
		styles,
		mouseTrap,
		form: formReducer,
		trivia,
		asyncReducers
	})
}

export default createReducer

export const injectAsyncReducer = (store, name, asyncReducer) => {
	if (!store.asyncReducers) { store.asyncReducers = {} }
	store.asyncReducers[name] = asyncReducer
	store.replaceReducer(createReducer(store.asyncReducers))
}