import { fetchTopFansEntities, fetchTopFansSettings } from 'modules/top_fans/actions/entities'

const sidebar = require('modules/top_fans/sidebar').default

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
									analytics.page({
										name:  'Scoreboard',
										category: 'Top Fans',
									})
									next()
								})
						// })
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/top_fans/components/Scoreboard').default,
								sidebar: sidebar,
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
								sidebar: sidebar,
							})
						})
					}				
				}
			])
		})
	},
})