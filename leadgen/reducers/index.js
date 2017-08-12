import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import entities from 'reducers/entities'
import admin from 'reducers/admin'
import alerts from 'reducers/alerts'
import activityIndicators from 'reducers/activityIndicators'

import fbLeadforms from 'leadgen/reducers/fbLeadforms'
import fbLeadgenForms from 'leadgen/reducers/fbLeadgenForms'
import fbLeadDestinations from 'leadgen/reducers/fbLeadDestinations'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		admin,
		alerts,
		activityIndicators,
		entities,
		// 
		fbLeadforms,
		fbLeadgenForms,
		fbLeadDestinations,
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