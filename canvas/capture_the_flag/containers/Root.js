import React, { Component, PropTypes } from 'react'
import Cookies from 'js-cookie'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/capture_the_flag/actions'

import WelcomeContainer from 'canvas/capture_the_flag/containers/WelcomeContainer'
import IndexContainer from 'canvas/capture_the_flag/containers/IndexContainer'
import LoginContainer from 'canvas/capture_the_flag/containers/LoginContainer'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	} else {
		replace({
			pathname: `/capture_the_flag/${window.checksum}/login`,
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
						path={`/capture_the_flag(/:checksum)`}
						//
						// The Welcome view only downloads static assets (images and texts) necessary to show the app
						// regardless of visitors being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest)
						//
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={WelcomeContainer}
					/>
					<Route
						path={`/capture_the_flag(/:checksum)/entries`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={IndexContainer}
					/>
					<Route path={`/capture_the_flag/:checksum/login`} component={LoginContainer} />
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default connect()(Root)
