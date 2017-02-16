import { fetchTopFansEntities } from 'modules/example/actions/entities'

const sidebar = require('modules/example/components/Sidebar').default

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'scoreboard',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchTopFansEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/example/components/Scoreboard').default,
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
								main: require('modules/example/components/Subscribe').default,
								sidebar: sidebar,
							})
						})
					}				
				}
			])
		})
	},
})