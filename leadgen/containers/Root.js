import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router } from 'react-router'
import { createRoutes } from 'leadgen/routes'

class Root extends Component {
  render() {
    const { store, dispatch, history } = this.props
    const routes = createRoutes(store, dispatch)
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect()(Root)
