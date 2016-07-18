module.exports = {
	path: 'users',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Users').default,
				sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			})
		})
	}
}