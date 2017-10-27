import { fetchEntities } from 'modules/fan_gate/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], require => {
			cb(null, [
				{
					path: 'entries',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchEntities(nextState.params.checksum)).then(() => {
							next()
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], require => {
							dispatch(turnOffGlobalIndicator())
							cb(null, {
								main: require('modules/fanGate/containers/Entries').default,
								sidebar: require('modules/fanGate/components/Sidebar').default,
							})
						})
					},
				},
			])
		})
	},
})
