import { setCurrentAppChecksum, getStatsSummary } from 'actions/apps'
import { 
	turnOnGlobalIndicator, 
	turnOffGlobalIndicator, 
	turnOffActivityCreatingApp, 
	turnOffActivityLoadingApp,
} from 'actions/activityIndicators'

export default (store, dispatch) => ({
	path: '/d/apps/:type/:checksum',
	getComponents(nextState, cb) {
		require.ensure([], require => {
			// console.log('esto solo estaba en dashbaord')
			// dispatch(turnOffGlobalIndicator())
			cb(null, require('containers/AppDashboardContainer').default)
			// cb(null, {
				// main: require('containers/AppDashboardContainer').default,
				// sidebar: require('modules/' + nextState.params.type + '/sidebar').default,
			// })
		})
	},
	onEnter: (nextState, replace, next) => {
		dispatch(turnOnGlobalIndicator())
		analytics.page('App Dashboard', {
			appType: nextState.params.type
		})
		dispatch(setCurrentAppChecksum(nextState.params.checksum)).then(() => {
			dispatch(turnOffActivityCreatingApp())
			dispatch(turnOffActivityLoadingApp())
			dispatch(getStatsSummary(nextState.params.checksum)).then(() => next())
		})
	},
	indexRoute: {
		onEnter: (nextState, replace, next) => {
			const beforeShowingDashboard = require(`modules/${nextState.params.type}/actions/entities`).beforeShowingDashboard
			if (beforeShowingDashboard) {
				dispatch(
					beforeShowingDashboard(nextState.params.checksum)
				).then(next)
			}
			else {
				next()	
			}
		},
		getComponents(nextState, cb) {
			require.ensure([], require => {
				dispatch(turnOffGlobalIndicator())
				cb(null, {
					main: require('containers/AppDashboard').default,
					secondary: require('modules/' + nextState.params.type + '/containers/Dashboard').default,
					sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
				})
			})
		}
	},
	childRoutes: [
		require('routes/Analytics'),
		require('routes/SetupGuide').default(store, dispatch),
		require('routes/Integrations'),
		require('routes/Users'),
		require('routes/Preferences'),
		require('modules/trivia/routes').default(store, dispatch),
		require('modules/top_fans/routes').default(store, dispatch),
		require('modules/photo_contest/routes').default(store, dispatch),
		require('modules/memory_match/routes').default(store, dispatch),
		require('modules/catalog/routes').default(store, dispatch),
	]
})