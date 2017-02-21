import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Cookies from 'js-cookie'
import { loginCallback } from 'canvas/trivia/actions/'
import Login from 'canvas/trivia/components/Login'
import Index from 'canvas/trivia/containers/Index'
import Thanks from 'canvas/trivia/containers/Thanks'
import AlreadyPlayed from 'canvas/trivia/containers/AlreadyPlayed'

const requireAuth = (nextState, replace, next, dispatch, fetchEntities = false) => {
	// if (Cookies.get('apiKey') || window.canvasApiKey) {
	// if (false) {
	// 	if (fetchEntities) {
	// 		console.log('hace fetch')
	// 		dispatch(loginCallback()).then(() => next())
	// 	}
	// 	else {
	// 		console.log('no hace fetch')
	// 		next()
	// 		console.log('ya hizo next')
	// 	}
	// }
	// else{
		replace({
			pathname: `/${window.canvasId}/${window.checksum}/login`,
		})
		next()
	// }
}

class Root extends Component {
	render() {
		const { store, history, dispatch } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route 
						path={`/${window.canvasId}(/:checksum)`} 
						onEnter={requireAuth}
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch, true)}
						component={Index} />
					<Route 
						path={`/${window.canvasId}/:checksum/questions`} 
						// onEnter={requireAuth}
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch, true)}
						component={Index} />
					<Route 
						path={`/${window.canvasId}/:checksum/thanks`}
						// onEnter={requireAuth}
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch, false)}
						component={Thanks}/>
					<Route 
						path={`/${window.canvasId}/:checksum/already-played`}
						// onEnter={requireAuth}
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch, false)}
						component={AlreadyPlayed}/>
					<Route 
						path={`/${window.canvasId}/:checksum/login`} 
						component={Login}/>
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default connect()(Root)