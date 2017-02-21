import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, startTimer } from 'canvas/trivia/actions'
import { loginCallback } from 'canvas/trivia/actions/user'
import { fetchImages } from 'canvas/trivia/actions/images'
import { fetchMessages } from 'canvas/trivia/actions/messages'
import { fetchSettings } from 'canvas/trivia/actions/settings'
import { toggleCountDown } from 'canvas/trivia/actions/countDown'
import Index from 'canvas/trivia/containers/Index'
import Intro from 'canvas/trivia/containers/Intro'
import Login from 'canvas/trivia/components/Login'
import Cookies from 'js-cookie'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		// dispatch(loginCallback()).then(() => next())
		next()
	}
	else{
		replace({
			pathname: `/${window.canvasId}/${window.checksum}/login`,
		})
		next()
	}
}

class Root extends Component {
	render() {
		const { store, history, dispatch } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route 
						path={`/${window.canvasId}(/:checksum)`} 
						// onEnter={requireAuth}
						// onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={Intro} />
					<Route 
						path={`/${window.canvasId}(/:checksum)/questions`} 
						onEnter={(nextState, replace, next) => startTimer(nextState, replace, next, dispatch)}
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch)}
						// onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
						component={Index} />

					<Route 
						path={`/${window.canvasId}(/:checksum)/thanks`}
						// onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
						component={Index} />

					<Route 
						path={`/${window.canvasId}(/:checksum)/already-played`}
						onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
						component={Index} />
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