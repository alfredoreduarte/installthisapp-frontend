import { injectAsyncReducer } from 'reducers'

export default (store) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'questions(/create)',
					modal: true,
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							// Uncomment these lines to load reducers asyncronously
							// let questionsReducer = require('modules/trivia/reducers').default
							// injectAsyncReducer(store, 'trivia', questionsReducer)
							cb(null, {
								main: require('modules/trivia/components/Questions').default,
								sidebar: require('modules/trivia/sidebar').default,
							})
						})
					}
				},
				{
					path: 'questions/edit/:questionId',
					modal: true,
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							// Uncomment these lines to load reducers asyncronously
							// let questionsReducer = require('modules/trivia/reducers').default
							// injectAsyncReducer(store, 'trivia', questionsReducer)
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
							// Uncomment these lines to load reducers asyncronously
							// let answersReducer = require('modules/trivia/reducers/answers').default
							// injectAsyncReducer(store, 'answers', answersReducer)
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