import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchAdmin } from 'actions/admin'
import { possibleOffers } from 'lib/offers'

const shouldTrackOffer = param => {
	if ( possibleOffers.indexOf(param) >= 0 ) {
		analytics.track('Offer Viewed', {
			type: param
		})
		return param
	}
	return false
}

const shouldTrackAccountConfirmation = param => {
	if ( param == 'true' ) {
		analytics.track('Account Verified')
		return param
	}
	return false
}

export const createRoutes = (store, dispatch) => ({
	path: '/d',
	component: require('containers/Application').default,
	indexRoute: {
		component: require('containers/AdminDashboard').default
	},
	onChange: (prevState, nextState, replace, next) => {
		if (nextState.location.pathname == '/d') {
			dispatch(fetchAdmin()).then(() => {
				next()
			})
		}
		else{
			next()
		}
	},
	onEnter: (nextState, replace, next) => {
		analytics.page('Admin Dashboard')
		shouldTrackOffer(nextState.location.query["offer"])
		shouldTrackAccountConfirmation(nextState.location.query["account_confirmation_success"])
		dispatch(fetchAdmin()).then(() => {
			next()
		})
	},
	childRoutes: [
		require('routes/Console'),
		require('routes/AccountComplete'),
		require('routes/Account'),
		require('routes/Card').default(store, dispatch),
		require('routes/CardOverlay').default(store, dispatch),
		require('routes/Plans'),
		{
			path: '/d/apps/',
			component: require('containers/Application').default,
			indexRoute: {
				component: require('containers/AdminDashboard').default
			},
		},
		{
			path: '/d/apps/create(/:step)',
			component: require('containers/Application').default,
			onEnter: (nextState, replace) => {
				
			},
			indexRoute: {
				component: require('containers/AdminDashboard').default
			},
		},
		require('routes/Dashboard').default(store, dispatch),
		require('routes/Design').default(store, dispatch),
	]
})