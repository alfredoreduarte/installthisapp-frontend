module.exports = {
	path: 'preferences',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Preferences').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	}
}