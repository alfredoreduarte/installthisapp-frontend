import { setCurrentAppChecksum } from 'actions/apps'
import { 
	turnOnGlobalIndicator, 
	turnOffGlobalIndicator,
} from 'actions/activityIndicators'
import { fetchStyles, fetchJsonTest, fetchMessages, fetchImages } from 'actions/styles'

export default (store, dispatch) => ({
	path: '/d/apps/:type/:checksum/design',
	getComponent(nextState, cb) {
		dispatch(turnOnGlobalIndicator())
		require.ensure([], require => {
			dispatch(turnOffGlobalIndicator())
			cb(null, require('containers/Design').default)
			// cb(null, {
			// 	editor: require('containers/Design').default,
			// 	preview: require('canvas/' + nextState.params.type + '/components/Previews').default,
			// })
		})
	},
	onEnter: (nextState, replace, next) => {
		analytics.page('App Design')
		analytics.track('Feature Used', {
			featureType: 'App Design',
		})
		dispatch(setCurrentAppChecksum(nextState.params.checksum)).then(() => {
			dispatch(fetchStyles()).then(() => {
				// dispatch(fetchJsonTest()).then(() => next())
				// dispatch(fetchMessages()).then(() => next())
				dispatch(fetchMessages()).then(() => {
					dispatch(fetchImages()).then(() => next())
				})
				// next()
			})
		})
	},
	onLeave: (prevState) => {
		// dispatch({
		// 	type: 'RESET_EDITOR'
		// })
	},
})