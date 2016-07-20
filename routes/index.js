import React from 'react'
import { Route, IndexRoute } from 'react-router'

export const createRoutes = store => ({
	path: '/(/apps)(/create)(/:step)',
	component: require('containers/Application').default,
	indexRoute: {
		component: require('containers/AdminDashboard').default
	},
	childRoutes: [
		require('routes/Dashboard').default(store),
		require('routes/Design'),
		require('routes/Account'),
	]
})