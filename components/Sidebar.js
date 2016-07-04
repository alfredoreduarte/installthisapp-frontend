import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const Sidebar = () => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		<ul className="list-unstyled">
			<li><IndexLink to="" activeClassName="active">Dashboard</IndexLink></li>
			<li><Link to="analytics">Analytics</Link></li>
			<li><Link to="design">Design</Link></li>
			<li><Link to="users" activeClassName="active">Users</Link></li>
			<li>
				<Link to="preferences">Preferences</Link>
				<ul className="list-unstyled">
					<li><Link to="">Localization</Link></li>
					<li><Link to="">Custom Scripts</Link></li>
					<li><Link to=""><span className="text-red">Delete App</span></Link></li>
				</ul>
			</li>
		</ul>
	</div>
)

export default Sidebar