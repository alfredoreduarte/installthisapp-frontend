import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchAdmin } from 'actions/admin'
import { fetchEntities } from 'actions/entities'

export const createRoutes = (store, dispatch) => ({
	path: '/d',
	component: require('containers/Application').default,
	indexRoute: {
		component: require('containers/AdminDashboard').default
	},
	onChange: (prevState, nextState, replace, next) => {
		if (nextState.location.pathname == '/d') {
			dispatch(fetchAdmin()).then(() => {
				dispatch(fetchEntities()).then(() => {
					next()
				})
			})
		}
		else{
			next()
		}
	},
	onEnter: (nextState, replace, next) => {
		dispatch(fetchAdmin()).then(() => {
			dispatch(fetchEntities()).then(() => {
				next()
			})
		})
	},
	childRoutes: [
		require('routes/Account'),
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
			indexRoute: {
				component: require('containers/AdminDashboard').default
			},
		},
		require('routes/Dashboard').default(store, dispatch),
		require('routes/Design').default(store, dispatch),
	]
})