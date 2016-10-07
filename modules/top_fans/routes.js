export default (store) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'scoreboard',
					onEnter: (nextState, replace) => {
						analytics.page({
							name:  'Scoreboard',
							category: 'Top Fans',
						})
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/top_fans/components/Scoreboard').default,
								sidebar: require('modules/top_fans/sidebar').default,
							})
						})
					}				
				}
			])
		})
	},
})