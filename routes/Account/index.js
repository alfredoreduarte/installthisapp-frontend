module.exports = {
	path: '/d/account',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('containers/Account').default)
		})
	}
}