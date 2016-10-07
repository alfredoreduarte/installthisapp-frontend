module.exports = {
	path: 'users',
	onEnter: (nextState, replace) => {
		analytics.page('Users List')
		analytics.track('Feature used', {
			type: 'Users List',
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Users').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	}
}