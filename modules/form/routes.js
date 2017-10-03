import { fetchEntities } from 'modules/form/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'
import { fetchStyles, fetchJsonTest, fetchMessages, fetchImages, fetchSettings } from 'actions/styles'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'entries',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchEntities())
							.then(() => {
								next()
							})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							cb(null, {
								main: require('modules/form/containers/Entries').default,
								sidebar: require('modules/form/components/Sidebar').default,
							})
						})
					}
				},
				// {
				// 	path: 'editor',
				// 	getComponent(nextState, cb) {
				// 		require.ensure([], require => {
				// 			dispatch(turnOffGlobalIndicator())
				// 			cb(null, require('containers/EditorContainer').default)
				// 		})
				// 	},
				// 	onEnter: (nextState, replace, next) => {
				// 		dispatch(turnOnGlobalIndicator())
				// 		// analytics.page('Form Wizard')
				// 		dispatch(fetchStyles()).then(() => {
				// 			dispatch(fetchMessages()).then(() => {
				// 				dispatch(fetchSettings()).then(() => {
				// 					dispatch(fetchEntities()).then(() => {
				// 						dispatch(fetchImages()).then(() => next())
				// 					})
				// 				})
				// 			})
				// 		})
				// 	},		
				// },
			])
		})
	},
})