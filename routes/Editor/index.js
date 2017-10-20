import { setCurrentAppChecksum } from 'actions/apps'
import { initializeEditorScreensAndSteps, initializeEditorDefaultStylesheet, reset } from 'actions/formEditorUI'
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
	onLeave: (prevState) => {
		dispatch(reset())
	},
	onEnter: (nextState, replace, next) => {
		dispatch(turnOnGlobalIndicator())
		// Instantiating steps and screens from the current app
		const app = nextState.params.type
		const editorSteps = require(`modules/${app}/editorSteps`).default
		const editorScreens = require(`modules/${app}/editorScreens`).default
		dispatch(initializeEditorScreensAndSteps(editorSteps, editorScreens))

		const defaultStyles = require(`!css-loader!sass-loader?outputStyle=expanded&indentType=tab&indentWidth=1!../../assets/canvas/${app}.sass`).toString()
		dispatch(initializeEditorDefaultStylesheet(defaultStyles))
		// 
		analytics.page('App Editor')
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