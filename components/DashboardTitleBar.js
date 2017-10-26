import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Navbar, NavDropdown, DropdownButton, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const DashboardTitleBar = () => (
  <div className="col-md-12 text-center" style={{ marginBottom: '50px' }}>
    <span className="h1 weight-thin text-primary">Apps</span>
  </div>
)
export default DashboardTitleBar
