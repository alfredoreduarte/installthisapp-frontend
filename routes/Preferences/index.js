module.exports = {
	path: 'preferences',
	onEnter: (nextState, replace) => {
		analytics.page('App Preferences')
		analytics.track('Feature Used', {
			featureType: 'App Preferences',
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Preferences').default,
				sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
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
			path: 'specific',
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/AppSpecificSettings').default)
				})
			}
		},
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