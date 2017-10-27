import { fetchTopFansEntities } from 'modules/top_fans/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		cb(null, {
			path: 'setup-guide',
			onEnter: (nextState, replace, next) => {
				dispatch(turnOnGlobalIndicator())
				dispatch(fetchTopFansEntities(nextState.params.checksum)).then(() => {
					analytics.page('Setup Guide', () => next())
				})
			},
			getComponent(nextState, cb) {
				require.ensure([], require => {
					dispatch(turnOffGlobalIndicator())
					cb(null, {
						main: require('modules/' + nextState.params.type + '/containers/Wizard').default,
						sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
					})
				})
			},
		})
	},
})
