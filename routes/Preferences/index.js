module.exports = {
	path: 'preferences',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Preferences').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	},
	indexRoute: {
		component: require('components/AppConfiguration').default,
		// getComponent(nextState, cb) {
		// 	require.ensure([], (require) => {
		// 		cb(null, {
		// 			main: require('components/AppConfiguration').default,
		// 			sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
		// 		})
		// 	})
		// },
	},
	childRoutes: [
		{
			path: 'delete',
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/AppDelete').default)
				})
			}
		}
	]
}