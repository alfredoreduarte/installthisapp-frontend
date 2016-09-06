import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Login from 'canvas/photo_contest/components/Login'
import Index from 'canvas/photo_contest/containers/Index'
import Upload from 'canvas/photo_contest/containers/Upload'
import SinglePhoto from 'canvas/photo_contest/containers/SinglePhoto'
import { loginCallback } from 'canvas/photo_contest/actions'

const requireAuth = (nextState, replace, next) => {
	if (window.canvasApiKey) {
		next()
	}
	else{
		replace({
			pathname: `/${window.canvasId}/${window.checksum}/login`,
		})
		next()
	}
}

const getPhotos = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

class Root extends Component {
	componentDidMount() {
		const { dispatch } = this.props
	}
	render() {
		const { store, history, dispatch } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route 
						path={`/${window.canvasId}(/:checksum)`}
						onEnter={(nextState, replace, next) => getPhotos(nextState, replace, next, dispatch)}
						component={Index} />
					<Route 
						path={`/${window.canvasId}/:checksum/upload`} 
						onEnter={requireAuth}
						component={Upload} />
					<Route 
						path={`/${window.canvasId}/:checksum/login`} 
						component={Login}/>
					<Route 
						path={`/${window.canvasId}/:checksum/:photoId`}
						onEnter={(nextState, replace, next) => getPhotos(nextState, replace, next, dispatch)}
						component={SinglePhoto} />
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