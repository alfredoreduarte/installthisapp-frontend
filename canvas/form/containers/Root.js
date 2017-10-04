import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/form/actions'
import WelcomeContainer from 'canvas/form/containers/WelcomeContainer'
import FormContainer from 'canvas/form/containers/FormContainer'
import ThanksContainer from 'canvas/form/containers/ThanksContainer'
import Index from 'canvas/form/containers/Index'
import Intro from 'canvas/form/containers/Intro'
import Login from 'canvas/form/containers/Login'
import Cookies from 'js-cookie'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	}
	else{
		replace({
			// pathname: `/${window.canvasId}/${window.checksum}/login`,
			pathname: `/form/${window.checksum}/login`,
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
						path={`/form(/:checksum)`} 
						// 
						// The Intro view downloads only the static assets (images and texts) necessary to show the app
						// regardless of the visitor being identified or not.
						// Some apps may also download the dynamic content (e.g. photos from a photo contest) 
						// 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={WelcomeContainer} />
					<Route 
						path={`/form(/:checksum)/form`} 
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={FormContainer} />
					<Route 
						path={`/form(/:checksum)/thanks`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={ThanksContainer} />
					<Route 
						// path={`/${window.canvasId}/:checksum/login`} 
						path={`/form/:checksum/login`} 
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