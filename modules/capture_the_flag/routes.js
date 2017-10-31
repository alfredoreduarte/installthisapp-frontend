import { fetchEntities } from 'modules/capture_the_flag/actions/entities'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], require => {
			cb(null, [
				{
					path: 'participants',
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
								main: require('modules/capture_the_flag/containers/Entries').default,
								sidebar: require('modules/capture_the_flag/components/Sidebar').default,
							})
						})
					},
				},
			])
		})
	},
})
