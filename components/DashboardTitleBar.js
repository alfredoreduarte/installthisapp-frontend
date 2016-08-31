import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Navbar, NavDropdown, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import TitleBar from 'components/TitleBar'

const DashboardTitleBar = () => (
	<div>
		<TitleBar title="Your Apps">
			<Link to='/d/apps/create' className="btn btn-success btn-lg">
				New App
			</Link>
		</TitleBar>
	</div>
)
export default DashboardTitleBar