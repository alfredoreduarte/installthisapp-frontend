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
import styles from 'reducers/styles'
import mouseTrap from 'reducers/design-helper/mouseTrap'

// const rootReducer = combineReducers({
// 	routing,
// 	filterText,
// 	usersSorting,
// 	appsSorting,
// 	selectedUserIds,
// 	admin,
// 	newApp,
// 	deleteApp,
// 	entities,
// 	styles,
// 	mouseTrap,
// 	form: formReducer
// })

const createReducer = asyncReducers => {
	// return combineReducers({
	// 	users,
	// 	posts,
	// 	...asyncReducers
	// });
	return combineReducers({
		routing,
		filterText,
		usersSorting,
		appsSorting,
		selectedUserIds,
		admin,
		newApp,
		deleteApp,
		entities,
		styles,
		mouseTrap,
		form: formReducer,
		...asyncReducers
	})
}

export default createReducer
// export default rootReducer

export const injectAsyncReducer = (store, name, asyncReducer) => {
	console.log('asyncReducer')
	console.log(asyncReducer)
	if (!store.asyncReducers) { store.asyncReducers = {} } 
	store.asyncReducers[name] = asyncReducer
	store.replaceReducer(createReducer(store.asyncReducers))
}