import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, DropdownButton, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import SearchForm from 'components/SearchForm'
import TitleBar from 'components/TitleBar'

const DashboardTitleBar = () => (
	<div>
		<TitleBar title="Your Apps and Pages">
			<Link to='/create' className="btn btn-success btn-lg">
				New App
			</Link>
		</TitleBar>
		<div className="col-md-12 ita-dashboard-tools">
			<div className="row">
				<div className="col-md-4">
					<SearchForm />
				</div>
				<div className="col-md-8 text-right">
					<DropdownButton bsStyle="link" title="Most Recent" pullRight>
						<MenuItem eventKey="1">Alphanumeric</MenuItem>
					</DropdownButton>
				</div>
			</div>
		</div>
	</div>
)

export default DashboardTitleBar