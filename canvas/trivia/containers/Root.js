import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Cookies from 'js-cookie'
import Login from 'canvas/trivia/components/Login'
import Index from 'canvas/trivia/containers/Index'
import Thanks from 'canvas/trivia/containers/Thanks'
import AlreadyPlayed from 'canvas/trivia/containers/AlreadyPlayed'

const requireAuth = (nextState, replace, next) => {
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
	componentDidMount() {
		const { dispatch } = this.props
	}
	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route 
						path={`/${window.canvasId}(/:checksum)`} 
						onEnter={requireAuth}
						component={Index} />
					<Route 
						path={`/${window.canvasId}/:checksum/thanks`}
						onEnter={requireAuth}
						component={Thanks}/>
					<Route 
						path={`/${window.canvasId}/:checksum/already-played`}
						onEnter={requireAuth}
						component={AlreadyPlayed}/>
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