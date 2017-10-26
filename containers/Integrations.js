import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'

class Integrations extends Component {
  render() {
    const { children, currentApp, updateApp } = this.props
    if (currentApp.title) {
      return <div className="">{React.cloneElement(children, { currentApp })}</div>
    } else {
      return <h1>Loading</h1>
    }
  }
}

const mapStateToProps = (state, props) => {
  const currentApp = getCurrentApp(state, props) || {}
  return {
    currentApp,
  }
}

const mapDispatchToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrations)
