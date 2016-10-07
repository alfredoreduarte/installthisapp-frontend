import { injectAsyncReducer } from 'reducers'
import { fetchPhotoContestEntities } from 'modules/photo_contest/actions/entities'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'photos',
					modal: true,
					onEnter: (nextState, replace, next) => {
						analytics.page({
							name:  'Photos',
							category: 'Photo Contest',
						})
						dispatch(fetchPhotoContestEntities(nextState.params.checksum)).then(() => {
							next()
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/photo_contest/components/Photos').default,
								sidebar: require('modules/photo_contest/sidebar').default,
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
								sidebar: require('modules/photo_contest/sidebar').default,
							})
						})
					}
				},
			])
		})
	},
})