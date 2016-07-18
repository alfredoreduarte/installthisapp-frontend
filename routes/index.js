import React from 'react'
import { Route, IndexRoute } from 'react-router'

const rootRoute = {
	childRoutes: [
		{
			path: '/',
			component: require('containers/Application').default,
			indexRoute: {
				component: require('containers/AdminDashboard').default
			},
			childRoutes: [
				require('routes/Dashboard'),
				{
					path: 'create(/:step)',
					component: require('containers/AdminDashboard').default,
				},
				require('routes/Design'),
				require('routes/Account'),
			]
		}
	]
}

export default rootRoute