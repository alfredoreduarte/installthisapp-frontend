module.exports = {
	path: 'apps/:type/:checksum/design',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('containers/Design').default)
		})
	}
}