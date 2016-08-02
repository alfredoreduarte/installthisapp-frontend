import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-router'
import { createRoutes } from 'routes'
import { fetchAdmin } from 'actions/admin'
import { fetchEntities } from 'actions/entities'

class Root extends Component {
	componentDidMount() {
		this.props.dispatch(fetchAdmin())
		this.props.dispatch(fetchEntities())
	}
	render() {
		const { store, history } = this.props
		const routes = createRoutes(store)
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