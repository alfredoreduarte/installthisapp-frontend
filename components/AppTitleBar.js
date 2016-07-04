import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import Breadcrumb from './Breadcrumb'
import SearchForm from './SearchForm'

const AppTitleBar = ({ installed = true, scheduled = false }) => (
	<div>
		<div className="col-md-12 ita-main-app-toolbar">
			<div className="pull-left">
				<Breadcrumb />
			</div>
			<div className="pull-right text-right">
				{!installed ? <Link to='/create' className="btn btn-lg btn-success">Install</Link> : null}
				{installed ? <Link to='/create' className="btn btn-lg btn-primary btn-outline">Share</Link> : null}
				{installed ? <Link to='/create' className="btn btn-lg btn-gray btn-outline">Uninstall</Link> : null}
				<ul className="list-inline">
					{scheduled ? <li><small><a href=""><u>Scheduled for <b>Wed 14, Sept.</b></u></a></small></li> : null}
					{!installed ? <li><p><small><a href=""><u>Schedule</u></a></small></p></li> : null}
					{!installed ? <li><p><small><a href=""><u>Preview</u></a></small></p></li> : null}
				</ul>
			</div>
		</div>
	</div>
)

export default AppTitleBar