import React from 'react'
import { Route, IndexRoute } from 'react-router'

// const rootRoute = {
// 	childRoutes: [
// 		{
// 			path: '/',
// 			component: require('containers/Application').default,
// 			indexRoute: {
// 				component: require('containers/AdminDashboard').default
// 			},
// 			childRoutes: [
// 				require('routes/Dashboard'),
// 				{
// 					path: 'create(/:step)',
// 					component: require('containers/AdminDashboard').default,
// 				},
// 				require('routes/Design'),
// 				require('routes/Account'),
// 			]
// 		}
// 	]
// }

// export default rootRoute

// const dashboardRoutes = require('routes/Dashboard')
// console.log('dashboardRoutes')
// console.log(dashboardRoutes)

export const createRoutes = store => ({
	path: '/(/apps)(/create)(/:step)',
	component: require('containers/Application').default,
	indexRoute: {
		component: require('containers/AdminDashboard').default
	},
	childRoutes: [
		require('routes/Dashboard').default(store),
		// {
		// 	path: 'create(/:step)',
		// 	component: require('containers/AdminDashboard').default,
		// },
		require('routes/Design'),
		require('routes/Account'),
	]
})