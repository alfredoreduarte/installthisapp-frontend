import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'reducers/entities'
import admin from 'reducers/admin'
import plans from 'reducers/plans'
import alerts from 'reducers/alerts'
import selectedItems from 'reducers/selectedItems'
import filterText from 'reducers/filterText'
import usersSorting from 'reducers/usersSorting'
import appsSorting from 'reducers/appsSorting'
import newApp from 'reducers/newApp'
import deleteApp from 'reducers/deleteApp'
import styles from 'reducers/styles'
import mouseTrap from 'reducers/design-helper/mouseTrap'
import activityIndicators from 'reducers/activityIndicators'

// Modules
import trivia from 'modules/trivia/reducers/'
import topFans from 'modules/top_fans/reducers/'
import photoContest from 'modules/photo_contest/reducers/'

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
		plans,
		alerts,
		newApp,
		deleteApp,
		entities,
		styles,
		mouseTrap,
		activityIndicators,
		form: formReducer,
		trivia,
		topFans,
		photoContest,
		asyncReducers
	})
}

export default createReducer

export const injectAsyncReducer = (store, name, asyncReducer) => {
	if (!store.asyncReducers) { store.asyncReducers = {} }
	store.asyncReducers[name] = asyncReducer
	store.replaceReducer(createReducer(store.asyncReducers))
}