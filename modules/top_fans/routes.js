import { fetchTopFansEntities, fetchTopFansSettings } from 'modules/top_fans/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

import Sidebar from 'modules/top_fans/components/Sidebar'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'scoreboard',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						// dispatch(fetchTopFansSettings(nextState.params.checksum))
						// .then(() => {
							dispatch(fetchTopFansEntities(nextState.params.checksum))
								.then(() => {
									next()
								})
						// })
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							cb(null, {
								main: require('modules/top_fans/containers/Scoreboard').default,
								sidebar: Sidebar,
							})
						})
					}				
				},
				{
					path: 'subscribe',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							cb(null, {
								main: require('modules/top_fans/components/Subscribe').default,
								sidebar: Sidebar,
							})
						})
					}				
				}
			])
		})
	},
})