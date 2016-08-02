export default (store) => ({
	path: '/apps/:type/:checksum',
	getComponents(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('containers/AppDashboardContainer').default)
			// cb(null, {
			// 	main: require('containers/AppDashboardContainer').default,
			// 	sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			// })
		})
	},
	indexRoute: {
		getComponents(nextState, cb) {
			require.ensure([], require => {
				cb(null, {
					main: require('containers/AppDashboard').default,
					sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
				})
				// cb(null, require('containers/AppDashboard').default)
			})
		}
	},
	childRoutes: [
		require('routes/Analytics'),
		require('routes/Users'),
		require('routes/Preferences'),
		require('modules/trivia/routes').default(store),
		require('modules/top_fans/routes'),
	]
})