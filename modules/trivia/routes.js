module.exports = {
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'questions',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/trivia/components/Questions').default,
								sidebar: require('modules/trivia/sidebar').default,
							})
						})
					}				
				},
				{
					path: 'answers',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							cb(null, {
								main: require('modules/trivia/components/Answers').default,
								sidebar: require('modules/trivia/sidebar').default,
							})
						})
					}				
				}
			])
		})
	},
}