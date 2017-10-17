import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent } from 'canvas/fan_gate/actions'

import WelcomeContainer from 'canvas/fan_gate/containers/WelcomeContainer'
import FlyerContainer from 'canvas/fan_gate/containers/FlyerContainer'

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('fanGatePassed') == window.checksum) {
		next()
	}
	else{
		replace({
			pathname: `/${window.module}/${window.checksum}/`,
		})
		next()
	}
}

const Root = ({ store, history, dispatch}) => 
<Provider store={store}>
	<Router history={history}>
		<Route 
			path={`/${window.module}(/:checksum)`}
			onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
			component={WelcomeContainer} />
		<Route 
			path={`/${window.module}(/:checksum)/flyer`}
			onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch).then(() => {
				return requireAuth(nextState, replace, next, dispatch)
			})}
			component={FlyerContainer} />
	</Router>
</Provider>

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default connect()(Root)