import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'

import modules from 'reducers/modules'
import entities from 'reducers/entities'
import admin from 'reducers/admin'
import plans from 'reducers/plans'
import alerts from 'reducers/alerts'
import selectedItems from 'reducers/selectedItems'
import filterText from 'reducers/filterText'
import wizard from 'reducers/wizard'
import usersSorting from 'reducers/usersSorting'
import appsSorting from 'reducers/appsSorting'
import newApp from 'reducers/newApp'
import deleteApp from 'reducers/deleteApp'
import styles from 'reducers/styles'
import mouseTrap from 'reducers/design-helper/mouseTrap'
import activityIndicators from 'reducers/activityIndicators'
import applicationData from 'reducers/applicationData'
import applicationLog from 'reducers/applicationLog'
import formEditorUI from 'reducers/formEditorUI'

// Modules
import trivia from 'modules/trivia/reducers/'
import topFans from 'modules/top_fans/reducers/'
import photoContest from 'modules/photo_contest/reducers/'
import memoryMatch from 'modules/memory_match/reducers/'
import catalog from 'modules/catalog/reducers/'
import form from 'modules/form/reducers/'
import coupons from 'modules/coupons/reducers/'
import staticHtml from 'modules/static_html/reducers/'
import captureTheFlag from 'modules/capture_the_flag/reducers/'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		filterText,
		wizard,
		usersSorting,
		appsSorting,
		selectedItems,
		admin,
		plans,
		alerts,
		newApp,
		deleteApp,
		modules,
		entities,
		styles,
		mouseTrap,
		activityIndicators,
		applicationData,
		applicationLog,
		form: formReducer,
		formEditorUI,
		trivia,
		topFans,
		photoContest,
		memoryMatch,
		catalog,
		formModule: form,
		coupons,
		staticHtml,
		captureTheFlag,
		// asyncReducers: asyncReducers
	})
}

export default createReducer

export const injectAsyncReducer = (store, name, asyncReducer) => {
	if (!store.asyncReducers) {
		store.asyncReducers = {}
	}
	store.asyncReducers[name] = asyncReducer
	store.replaceReducer(createReducer(store.asyncReducers))
}
