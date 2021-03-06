import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchAdmin } from 'actions/admin'
import { possibleOffers } from 'lib/offers'

const shouldTrackOffer = param => {
	if (possibleOffers.indexOf(param) >= 0) {
		analytics.track('Offer Viewed', {
			type: param,
		})
		return param
	}
	return false
}

const shouldTrackAccountConfirmation = param => {
	if (param == 'true') {
		analytics.track('Account Verified')
		return param
	}
	return false
}

export const createRoutes = (store, dispatch) => ({
	path: '/d',
	component: require('containers/Application').default,
	indexRoute: {
		getComponent(nextState, cb) {
			require.ensure([], require => {
				//
				// Un-instantiate all apps
				//
				dispatch({
					type: 'ALL_MODULES/CLEANUP',
				})
				dispatch(fetchAdmin()).then(() => {
					cb(null, require('containers/AdminDashboard').default)
				})
			})
		},
	},
	onChange: (prevState, nextState, replace, next) => next(),
	onEnter: (nextState, replace, next) => {
		analytics.page('Admin Dashboard')
		shouldTrackOffer(nextState.location.query['offer'])
		shouldTrackAccountConfirmation(nextState.location.query['account_confirmation_success'])
		dispatch(fetchAdmin()).then(() => {
			console.log('onEnter')
			next()
		})
	},
	childRoutes: [
		require('routes/Console'),
		require('routes/AccountComplete').default(store, dispatch),
		require('routes/Account'),
		require('routes/Card').default(store, dispatch),
		require('routes/CardOverlay').default(store, dispatch),
		require('routes/Plans'),
		{
			path: '/d/apps/',
			component: require('containers/Application').default,
			indexRoute: {
				component: require('containers/AdminDashboard').default,
			},
		},
		{
			path: '/d/apps/create(/:step)',
			component: require('containers/Application').default,
			onEnter: (nextState, replace) => {},
			indexRoute: {
				component: require('containers/AdminDashboard').default,
			},
		},
		require('routes/Dashboard').default(store, dispatch),
		require('routes/Design').default(store, dispatch),
		require('routes/Editor').default(store, dispatch),
	],
})
