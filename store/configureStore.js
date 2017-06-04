import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createRavenMiddleware from "raven-for-redux"
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import createReducer from 'reducers'

const reactRouterMiddleware = routerMiddleware(browserHistory)
const ravenMiddleware = createRavenMiddleware(window.Raven)

let configureStore

if (process.env.NODE_ENV == 'development') {
	const createLogger = require('redux-logger')
	configureStore = (preloadedState) => {
		const logger = createLogger()
		let store = createStore(
			createReducer(),
			preloadedState,
			compose(
				applyMiddleware(thunkMiddleware, reactRouterMiddleware, ravenMiddleware, logger),
				// applyMiddleware(thunkMiddleware, reactRouterMiddleware),
				window.devToolsExtension ? window.devToolsExtension() : (f) => f
			)
		)
		if (module.hot) {
			// Prevent hot reloading of routes: https://github.com/reactjs/react-router/issues/2704
			module.hot.decline("routes")
			// Enable Webpack hot module replacement for reducers
			module.hot.accept('reducers', () => {
				// const nextRootReducer = require('reducers').default
				// store.replaceReducer(nextRootReducer)
				const reducers = require('reducers').default
				store.replaceReducer(reducers(store.asyncReducers))
			})
		}
		return store
	}
}
else {
	configureStore = (preloadedState) => {
		let store = createStore(
			createReducer(),
			preloadedState,
			compose(
				applyMiddleware(thunkMiddleware, reactRouterMiddleware, ravenMiddleware),
				window.devToolsExtension && window.alias ? window.devToolsExtension() : (f) => f
			)
		)
		return store
	}
}

export default configureStore