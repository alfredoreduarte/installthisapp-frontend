module.exports = {
	path: 'analytics',
	onEnter: (nextState, replace) => {
		analytics.page('App Analytics')
		analytics.track('Feature Used', {
			featureType: 'App Analytics',
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Analytics').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	}
}