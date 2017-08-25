import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'reducers/entities'
import admin from 'reducers/admin'
import alerts from 'reducers/alerts'
import activityIndicators from 'reducers/activityIndicators'

import leadgenUI from 'leadgen/reducers/ui'
import fbLeadgenForms from 'leadgen/reducers/fbLeadgenForms' // actual FB forms
// import fbLeadforms from 'leadgen/reducers/fbLeadforms'
// import fbLeadDestinations from 'leadgen/reducers/fbLeadDestinations'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		leadgenUI,
		admin,
		alerts,
		activityIndicators,
		entities,
		// 
		fbLeadgenForms,
		// 
		form: formReducer,
	})
}

export default createReducer

export const injectAsyncReducer = (store, name, asyncReducer) => {
	if (!store.asyncReducers) { store.asyncReducers = {} }
	store.asyncReducers[name] = asyncReducer
	store.replaceReducer(createReducer(store.asyncReducers))
}