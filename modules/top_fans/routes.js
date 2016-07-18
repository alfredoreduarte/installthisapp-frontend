module.exports = {
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'scores',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/top_fans/components/Scores').default,
								sidebar: require('modules/top_fans/sidebar').default,
							})
						})
					}				
				}
			])
		})
	},
}