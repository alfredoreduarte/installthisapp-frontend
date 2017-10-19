import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { getStaticContent, getStaticContentAndEntities } from 'canvas/static_html/actions'
import PageContainer from 'canvas/static_html/containers/PageContainer'
import Cookies from 'js-cookie'

const getData = (nextState, replace, next, dispatch) => dispatch(loginCallback()).then(() => next())

const requireAuth = (nextState, replace, next, dispatch) => {
	if (Cookies.get('apiKey') || window.canvasApiKey) {
		next()
	}
	else{
		replace({
			pathname: `/static_html/${window.checksum}/login`,
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
						path={`/static_html(/:checksum)`}
						onEnter={(nextState, replace, next) => getStaticContent(nextState, replace, next, dispatch)}
						component={PageContainer} />
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