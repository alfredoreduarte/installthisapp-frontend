import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

const Sidebar = ({ checksum }) => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		<ul className="list-unstyled">
			<li><IndexLink to={`/apps/${checksum}`} activeClassName="active">Dashboard</IndexLink></li>
			<li><Link to={`/apps/${checksum}/analytics`}>Analytics</Link></li>
			<li><Link to={`/apps/${checksum}/design`}>Design</Link></li>
			<li><Link to={`/apps/${checksum}/users`} activeClassName="active">Users</Link></li>
			<li>
				<Link to={`/apps/${checksum}/preferences`}>Preferences</Link>
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