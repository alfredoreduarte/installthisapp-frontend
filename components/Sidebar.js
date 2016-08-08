import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const Sidebar = ({ checksum, type, children, menu }) => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		<ul className="list-unstyled">
			<li><IndexLink to={`/apps/${type}/${checksum}`} activeClassName="active">Dashboard</IndexLink></li>
			<li><Link to={`/d/apps/${type}/${checksum}/analytics`} activeClassName="active">Analytics</Link></li>
			<li><Link to={`/d/apps/${type}/${checksum}/design`} activeClassName="active">Design</Link></li>
			<li><Link to={`/d/apps/${type}/${checksum}/users`} activeClassName="active">Users</Link></li>
		</ul>
		{children}
		<ul className="list-unstyled">
			<li>
				<Link to={`/d/apps/${type}/${checksum}/preferences`} activeClassName="active">Preferences</Link>
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