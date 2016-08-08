import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { setChecksum } from 'canvas/Trivia/actions/'
import Index from 'canvas/Trivia/components/Index'
import Login from 'canvas/Trivia/components/Login'

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
					<Route path={`/${window.canvasId}/(:checksum)/logged`} component={Index}/>
					<Route path={`/${window.canvasId}/(:checksum)`} component={Login}/>
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