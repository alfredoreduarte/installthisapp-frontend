// @flow
import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/catalog/actions'
import Index from 'canvas/catalog/containers/Index'
import SingleProduct from 'canvas/catalog/containers/SingleProduct'
import Categories from 'canvas/catalog/containers/Categories'
import Login from 'canvas/catalog/containers/Login'
import Cookies from 'js-cookie'

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
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
						// 
						// The Intro view downloads only the static assets (images and texts) necessary to show the app
						// regardless of the visitor being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest) 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={Index} />
					<Route 
						path={`/${window.canvasId}(/:checksum)/categories`}
						// 
						// 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={Categories} />
					<Route 
						path={`/${window.canvasId}(/:checksum)/categories/:categorySlug`}
						// 
						// 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={Index} />
					<Route 
						path={`/${window.canvasId}(/:checksum)/:productSlug`}
						// 
						// 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={SingleProduct} />
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