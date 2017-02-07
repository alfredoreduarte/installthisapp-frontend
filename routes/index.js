import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchAdmin } from 'actions/admin'

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
		// console.log('nextState', nextState.params)
		// console.log('replace', replace)
		dispatch(fetchAdmin()).then(() => {
			next()
		})
	},
	childRoutes: [
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