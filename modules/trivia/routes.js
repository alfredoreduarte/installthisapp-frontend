import { injectAsyncReducer } from 'reducers'

export default (store) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'questions',
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							let questionsReducer = require('modules/trivia/reducers/questions').default
							injectAsyncReducer(store, 'questions', questionsReducer)
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
							let answersReducer = require('modules/trivia/reducers/answers').default
							injectAsyncReducer(store, 'answers', answersReducer)
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
})