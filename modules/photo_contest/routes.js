import { fetchEntities } from 'modules/photo_contest/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], require => {
			cb(null, [
				{
					path: 'photos',
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
								main: require('modules/photo_contest/containers/PhotosContainer').default,
								sidebar: require('modules/photo_contest/components/Sidebar').default,
							})
						})
					},
				},
			])
		})
	},
})
