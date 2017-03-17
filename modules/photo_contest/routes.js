import { injectAsyncReducer } from 'reducers'
import { fetchPhotoContestEntities } from 'modules/photo_contest/actions/entities'
import Sidebar from 'modules/photo_contest/components/Sidebar'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'photos',
					onEnter: (nextState, replace, next) => {
						dispatch(fetchPhotoContestEntities(nextState.params.checksum)).then(() => {
							next()
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/photo_contest/components/Photos').default,
								sidebar: Sidebar,
							})
						})
					}
				},
				{
					path: 'photos/:photoId',
					modal: true,
					onEnter: (nextState, replace, next) => {
						dispatch(fetchPhotoContestEntities(nextState.params.checksum)).then(() => {
							next()
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/photo_contest/components/Photos').default,
								sidebar: Sidebar,
							})
						})
					}
				},
			])
		})
	},
})