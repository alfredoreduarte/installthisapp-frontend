import React, { Component, PropTypes } from 'react'
import Cookies from 'js-cookie'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/photo_contest/actions'

import PhotosListContainer from 'canvas/photo_contest/containers/PhotosListContainer'
import UploadContainer from 'canvas/photo_contest/containers/UploadContainer'
import SingleContainer from 'canvas/photo_contest/containers/SingleContainer'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	} else {
		replace({
			pathname: `/photo_contest/${window.checksum}/login`,
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
						path={`/photo_contest(/:checksum)`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={PhotosListContainer}
					/>
					<Route
						path={`/photo_contest(/:checksum)/upload`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={UploadContainer}
					/>
					<Route
						path={`/photo_contest(/:checksum)/:photoId`}
						onEnter={(nextState, replace, next) => getStaticContentAndEntities(nextState, replace, next, dispatch)}
						component={SingleContainer}
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
