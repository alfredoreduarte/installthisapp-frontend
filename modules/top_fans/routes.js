import { fetchTopFansEntities, fetchTopFansSettings } from 'modules/top_fans/actions/entities'

import Sidebar from 'modules/top_fans/components/Sidebar'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'scoreboard',
					onEnter: (nextState, replace, next) => {
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
							cb(null, {
								main: require('modules/top_fans/components/Scoreboard').default,
								sidebar: Sidebar,
							})
						})
					}				
				},
				{
					path: 'subscribe',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
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