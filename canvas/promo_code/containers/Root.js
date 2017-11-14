import React, { Component, PropTypes } from 'react'
import Cookies from 'js-cookie'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/promo_code/actions'

import WelcomeContainer from 'canvas/promo_code/containers/WelcomeContainer'
import IndexContainer from 'canvas/promo_code/containers/IndexContainer'
import ThanksContainer from 'canvas/promo_code/containers/ThanksContainer'
import InvalidContainer from 'canvas/promo_code/containers/InvalidContainer'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	} else {
		replace({
			pathname: `/promo_code/${window.checksum}/login`,
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
						path={`/promo_code(/:checksum)`}
						//
						// The Welcome view only downloads static assets (images and texts) necessary to show the app
						// regardless of visitors being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest)
						//
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={WelcomeContainer}
					/>
					<Route
						path={`/promo_code(/:checksum)/form`}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={IndexContainer}
					/>
					<Route
						path={`/promo_code(/:checksum)/thanks`}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={ThanksContainer}
					/>
					<Route
						path={`/promo_code(/:checksum)/invalid`}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={InvalidContainer}
					/>
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
