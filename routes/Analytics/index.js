module.exports = {
	path: 'analytics',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Analytics').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	}
}