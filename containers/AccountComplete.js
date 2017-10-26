import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const AccountComplete = ({ children, admin }) => <div>{React.cloneElement(children, { admin })}</div>

const mapStateToProps = ({ admin }) => {
  return {
    admin,
  }
}

export default connect(mapStateToProps)(AccountComplete)
