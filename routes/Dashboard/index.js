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
			cb(null, require('containers/AppDashboardContainer').default)
		})
	},
	onEnter: (nextState, replace, next) => {
		dispatch(turnOnGlobalIndicator())
		analytics.page('App Dashboard', {
			appType: nextState.params.type,
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
				dispatch(beforeShowingDashboard(nextState.params.checksum)).then(next)
			} else {
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
		},
	},
	childRoutes: [
		require('routes/Analytics'),
		require('routes/SetupGuide').default(store, dispatch),
		require('routes/Integrations').default(store, dispatch),
		require('routes/Users').default(store, dispatch),
		require('routes/Preferences').default(store, dispatch),
		require('modules/trivia/routes').default(store, dispatch),
		require('modules/top_fans/routes').default(store, dispatch),
		require('modules/photo_contest/routes').default(store, dispatch),
		require('modules/memory_match/routes').default(store, dispatch),
		require('modules/catalog/routes').default(store, dispatch),
		require('modules/form/routes').default(store, dispatch),
		require('modules/coupons/routes').default(store, dispatch),
		require('modules/capture_the_flag/routes').default(store, dispatch),
		require('modules/promo_code/routes').default(store, dispatch),
	],
})
