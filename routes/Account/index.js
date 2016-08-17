module.exports = {
	path: '/d/account',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('containers/Account').default)
		})
	},
	indexRoute: {
		component: require('components/AccountPreferences').default
	},
	childRoutes: [
		{
			path: 'billing',
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Billing').default)
				})
			}
		},
		{
			path: 'team',
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Team').default)
				})
			}
		},
		{
			path: 'referrals',
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Referrals').default)
				})
			}
		}
	]
}