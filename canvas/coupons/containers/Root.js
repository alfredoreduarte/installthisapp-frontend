import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/coupons/actions'

import WelcomeContainer from 'canvas/coupons/containers/WelcomeContainer'
import CouponContainer from 'canvas/coupons/containers/CouponContainer'
import NoCouponsContainer from 'canvas/coupons/containers/NoCouponsContainer'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	}
	else{
		replace({
			// pathname: `/${window.canvasId}/${window.checksum}/login`,
			pathname: `/coupons/${window.checksum}/login`,
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
						path={`/coupons(/:checksum)`}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={WelcomeContainer} />
					<Route 
						path={`/coupons(/:checksum)/coupon`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={CouponContainer} />
					<Route 
						path={`/coupons(/:checksum)/no-coupon`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={NoCouponsContainer} />
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