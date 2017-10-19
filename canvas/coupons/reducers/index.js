import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import applicationData from 'canvas/coupons/reducers/applicationData'
import activityIndicators from 'canvas/coupons/reducers/activityIndicators'
import entities from 'canvas/coupons/reducers/entities'
import settings from 'canvas/coupons/reducers/settings'
import messages from 'canvas/coupons/reducers/messages'
import images from 'canvas/coupons/reducers/images'
import loggedUser from 'canvas/coupons/reducers/loggedUser'
import coupon from 'canvas/coupons/reducers/coupon'

const createReducer = asyncReducers => {
	return combineReducers({
		routing,
		applicationData,
		activityIndicators,
		entities,
		settings,
		messages,
		images,
		loggedUser,
		coupon,
	})
}

export default createReducer