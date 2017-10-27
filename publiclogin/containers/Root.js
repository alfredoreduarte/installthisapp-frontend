import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'

class Root extends Component {
	render() {
		const { store, dispatch } = this.props
		return (
			<Provider store={store}>
				<div>hola</div>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
}

export default connect()(Root)
