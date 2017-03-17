import { fetchEntities } from 'modules/example/actions/entities'

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
								main: require('modules/example/containers/Entries').default,
								sidebar: require('modules/example/components/Sidebar').default,
							})
						})
					}				
				},
			])
		})
	},
})