module.exports = {
	path: '/d/complete-profile',
	onEnter: (nextState, replace) => {
		analytics.page('Complete Profile')
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('containers/AccountComplete').default)
		})
	},
	indexRoute: {
		component: require('components/AccountComplete').default
	}
}