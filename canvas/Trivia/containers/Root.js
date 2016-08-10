import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { setChecksum } from 'canvas/Trivia/actions/'
import Index from 'canvas/Trivia/components/Index'
import Login from 'canvas/Trivia/components/Login'
import Thanks from 'canvas/Trivia/components/Thanks'
import AlreadyPlayed from 'canvas/Trivia/components/AlreadyPlayed'

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
		dispatch(setChecksum(window.checksum))
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