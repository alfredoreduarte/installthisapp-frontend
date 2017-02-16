module.exports = {
	path: 'integrations',
	onEnter: (nextState, replace) => {
		analytics.page('App Integrations')
		analytics.track('Feature Used', {
			featureType: 'App Integrations',
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Integrations').default,
				sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
			})
		})
	}
}