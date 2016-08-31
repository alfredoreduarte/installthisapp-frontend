import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
// import rootReducer from 'reducers'
import createReducer from 'reducers'

const reactRouterMiddleware = routerMiddleware(browserHistory)

export default function configureStore(preloadedState) {
	const logger = createLogger()
	let store = createStore(
		// rootReducer,
		createReducer(),
		preloadedState,
		compose(
			applyMiddleware(thunkMiddleware, reactRouterMiddleware, logger),
			// applyMiddleware(thunkMiddleware, reactRouterMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : (f) => f
		)
	)

	if (module.hot) {
		// Prevent hot reloading of routes: https://github.com/reactjs/react-router/issues/2704
		// module.hot.decline("routes")
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