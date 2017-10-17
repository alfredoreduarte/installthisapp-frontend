import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/example/actions'
import Index from 'canvas/example/containers/Index'
import Welcome from 'canvas/example/containers/Welcome'
import Login from 'canvas/example/containers/Login'
import Cookies from 'js-cookie'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	}
	else{
		replace({
			// pathname: `/${window.canvasId}/${window.checksum}/login`,
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
						// path={`/${window.canvasId}(/:checksum)`} 
						path={`/example(/:checksum)`} 
						// 
						// The Intro view downloads only the static assets (images and texts) necessary to show the app
						// regardless of the visitor being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest) 
						// 
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={Intro} />
					<Route 
						// path={`/${window.canvasId}(/:checksum)/entries`}
						path={`/example(/:checksum)/entries`}
						// 
						// 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={Index} />
					<Route 
						// path={`/${window.canvasId}/:checksum/login`} 
						path={`/example/:checksum/login`} 
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