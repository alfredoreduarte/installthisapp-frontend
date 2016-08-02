import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Index from 'canvas/Trivia/components/Index'
import { fetchEntities } from 'canvas/Trivia/actions/'

class Root extends Component {
	componentDidMount() {
		console.log('props', this.props)
		this.props.dispatch(fetchEntities())
	}
	render() {
		const { store, history } = this.props
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route path="/" component={Index}/>
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