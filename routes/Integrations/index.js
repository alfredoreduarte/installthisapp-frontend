module.exports = {
	path: 'integrations',
	onEnter: (nextState, replace) => {
		analytics.page('App Integrations')
		analytics.track('Feature Used', {
			featureType: 'App Integrations',
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				main: require('containers/Integrations').default,
				sidebar: require('modules/' + nextState.params.type + '/components/Sidebar').default,
			})
		})
	},
	indexRoute: {
		component: require('components/Integrations').default,
	},
	childRoutes: [
		{
			path: 'facebook',
			getComponents(nextState, cb) {
				require.ensure([], (require) => {
					// Uncomment these lines to load reducers asyncronously
					// let questionsReducer = require('modules/trivia/reducers').default
					// injectAsyncReducer(store, 'trivia', questionsReducer)
					cb(null, require('components/IntegrationFacebook').default)
				})
			}
		}
	]
}