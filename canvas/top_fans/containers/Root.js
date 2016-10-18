import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { loginCallback } from 'canvas/top_fans/actions'
import Index from 'canvas/top_fans/containers/Index'
import Intro from 'canvas/top_fans/containers/Intro'
import Login from 'canvas/top_fans/components/Login'
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
						onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
						component={Intro} />
					<Route 
						path={`/${window.canvasId}(/:checksum)/scores`} 
						// onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next, dispatch)}
						// onEnter={(nextState, replace, next) => getData(nextState, replace, next, dispatch)}
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