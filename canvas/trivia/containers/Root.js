import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Index from 'canvas/trivia/components/Index'
import Login from 'canvas/trivia/components/Login'
import Thanks from 'canvas/trivia/components/Thanks'
import AlreadyPlayed from 'canvas/trivia/components/AlreadyPlayed'

const requireAuth = (nextState, replace) => {
	if (window.canvasApiKey) {
		
	}
	else{
		replace({
			pathname: `/${window.canvasId}/${window.checksum}/login`,
		})
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
						component={Thanks}/>
					<Route 
						path={`/${window.canvasId}/:checksum/already-played`}
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