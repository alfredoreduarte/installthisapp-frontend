import { setCurrentAppChecksum } from 'actions/apps'
import { fetchEntities } from 'modules/form/actions/entities'
import { 
	turnOnGlobalIndicator, 
	turnOffGlobalIndicator,
	turnOffActivityCreatingApp,
	turnOffActivityLoadingApp,
} from 'actions/activityIndicators'
import { fetchStyles, fetchMessages, fetchImages, fetchSettings } from 'actions/styles'

export default (store, dispatch) => ({
	path: '/d/apps/:type/:checksum/editor',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			dispatch(turnOffGlobalIndicator())
			cb(null, require('containers/EditorContainer').default)
		})
	},
	onEnter: (nextState, replace, next) => {
		dispatch(turnOnGlobalIndicator())
		analytics.page('Form Editor')
		dispatch(setCurrentAppChecksum(nextState.params.checksum)).then(() => {
			dispatch(fetchStyles()).then(() => {
				dispatch(fetchMessages()).then(() => {
					dispatch(fetchSettings()).then(() => {
						dispatch(fetchEntities()).then(() => {
							dispatch(fetchImages()).then(() => {
								dispatch(turnOffActivityCreatingApp())
								dispatch(turnOffActivityLoadingApp())
								return next()
							})
						})
					})
				})
			})
		})
	},
})