import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-router'
import routes from 'routes'
import { fetchAdminMock } from 'actions/actionCreators'

class Root extends Component {
	componentDidMount() {
		this.props.dispatch(fetchAdminMock())
	}
	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<Router history={history} routes={routes} />
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default connect()(Root)