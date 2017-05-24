// import { injectAsyncReducer } from 'reducers'
import { turnOnGlobalIndicator, turnOffGlobalIndicator } from 'actions/activityIndicators'
import { fetchTriviaEntities } from 'modules/trivia/actions/entities'
import Sidebar from 'modules/trivia/components/Sidebar'

export default (store, dispatch) => ({
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				{
					path: 'questions(/create)',
					modal: true,
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchTriviaEntities(nextState.params.checksum)).then(() => next())
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							// Uncomment these lines to load reducers asyncronously
							// let questionsReducer = require('modules/trivia/reducers').default
							// injectAsyncReducer(store, 'trivia', questionsReducer)
							cb(null, {
								main: require('modules/trivia/components/Questions').default,
								sidebar: Sidebar,
							})
						})
					}
				},
				{
					path: 'questions/edit/:questionId',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchTriviaEntities(nextState.params.checksum)).then(() => next())
					},
					modal: true,
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							// Uncomment these lines to load reducers asyncronously
							// let questionsReducer = require('modules/trivia/reducers').default
							// injectAsyncReducer(store, 'trivia', questionsReducer)
							cb(null, {
								main: require('modules/trivia/components/Questions').default,
								sidebar: Sidebar,
							})
						})
					}
				},
				{
					path: 'answers',
					onEnter: (nextState, replace, next) => {
						dispatch(turnOnGlobalIndicator())
						dispatch(fetchTriviaEntities(nextState.params.checksum)).then(() => next())
					},
					getComponents(nextState, cb) {
						require.ensure([], (require) => {
							dispatch(turnOffGlobalIndicator())
							// Uncomment these lines to load reducers asyncronously
							// let answersReducer = require('modules/trivia/reducers/answers').default
							// injectAsyncReducer(store, 'answers', answersReducer)
							cb(null, {
								main: require('modules/trivia/components/Answers').default,
								sidebar: Sidebar,
							})
						})
					}				
				}
			])
		})
	},
})