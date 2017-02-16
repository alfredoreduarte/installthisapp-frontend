import { fetchTopFansEntities } from 'modules/top_fans/actions/entities'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		cb(null, {
			path: 'setup-guide',
			onEnter: (nextState, replace, next) => {
				dispatch(fetchTopFansEntities(nextState.params.checksum))
				.then(() => {
					analytics.page('Setup Guide', () => next())
				})
			},
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, {
						main: require('containers/Wizard').default,
						sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
					})
				})
			}
		})
	},
})