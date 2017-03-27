import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import createReducer from 'canvas/memory_match/reducers'

const reactRouterMiddleware = routerMiddleware(browserHistory)

export default function configureStore(preloadedState) {
	const logger = createLogger()
	let store = createStore(
		createReducer(),
		preloadedState,
		compose(
			applyMiddleware(thunkMiddleware, reactRouterMiddleware, logger),
			window.devToolsExtension ? window.devToolsExtension() : (f) => f
		)
	)

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const reducers = require('../reducers').default
			store.replaceReducer(reducers(store.asyncReducers))
		})
	}

	return store
}