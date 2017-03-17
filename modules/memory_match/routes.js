import { fetchEntities } from 'modules/memory_match/actions/entities'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'entries',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchEntities(nextState.params.checksum))
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/memory_match/containers/Entries').default,
								sidebar: require('modules/memory_match/components/Sidebar').default,
							})
						})
					}				
				},
			])
		})
	},
})