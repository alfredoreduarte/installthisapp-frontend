import React, { Component, PropTypes } from 'react'
import Cookies from 'js-cookie'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/example/actions'

import WelcomeContainer from 'canvas/example/containers/WelcomeContainer'
import IndexContainer from 'canvas/example/containers/IndexContainer'
import LoginContainer from 'canvas/example/containers/LoginContainer'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	} else {
		replace({
			pathname: `/example/${window.checksum}/login`,
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
						path={`/example(/:checksum)`}
						//
						// The Welcome view only downloads static assets (images and texts) necessary to show the app
						// regardless of visitors being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest)
						//
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={WelcomeContainer}
					/>
					<Route
						path={`/example(/:checksum)/entries`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={IndexContainer}
					/>
					<Route path={`/example/:checksum/login`} component={LoginContainer} />
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
