import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
	const logger = createLogger()
	const store = createStore(
		rootReducer,
		preloadedState,
		compose(
			applyMiddleware(thunkMiddleware, logger),
			window.devToolsExtension ? window.devToolsExtension() : (f) => f
		)
	)

	if (module.hot) {
		// Prevent hot reloading of routes: https://github.com/reactjs/react-router/issues/2704
		module.hot.decline("../routes.js")
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}