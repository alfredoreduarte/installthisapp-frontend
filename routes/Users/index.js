import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		cb(null, {
			path: 'users',
			onEnter: (nextState, replace, next) => {
				dispatch(turnOnGlobalIndicator())
				analytics.page('Users List')
				next()
			},
			getComponent(nextState, cb) {
				require.ensure([], require => {
					dispatch(turnOffGlobalIndicator())
					cb(null, {
						main: require('containers/Users').default,
						sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
					})
				})
			},
		})
	},
})
