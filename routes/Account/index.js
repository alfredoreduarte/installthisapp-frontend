module.exports = {
	path: '/d/account',
	onEnter: (nextState, replace) => {
		analytics.page('Account')
	},
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('containers/Account').default)
		})
	},
	indexRoute: {
		component: require('components/AccountPreferences').default,
	},
	childRoutes: [
		{
			path: 'password',
			onEnter: (nextState, replace) => {
				analytics.page('Account Password')
			},
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Password').default)
				})
			},
		},
		{
			path: 'billing',
			onEnter: (nextState, replace) => {
				analytics.page('Account Billing')
			},
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Billing').default)
				})
			},
		},
		{
			path: 'team',
			onEnter: (nextState, replace) => {
				analytics.page('Account Team')
			},
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Team').default)
				})
			},
		},
		{
			path: 'referrals',
			onEnter: (nextState, replace) => {
				analytics.page('Account Referrals')
			},
			getComponents(nextState, cb) {
				require.ensure([], require => {
					cb(null, require('components/Referrals').default)
				})
			},
		},
	],
}
