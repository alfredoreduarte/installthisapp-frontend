import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const ExternalLinksMenu = ({ checksum, facebookPageIdentifier, fbAppId, fbAppCanvasId }) => (
	<ul className="list-unstyled">
		<li>
			<a 
			href={`https://www.facebook.com/pages/${facebookPageIdentifier}/${facebookPageIdentifier}?sk=app_${fbAppId}`}
			target="_blank"
			className="text-primary">View on Facebook</a>
		</li>
		<li>
			<a 
			href={`/${fbAppCanvasId}/${checksum}`}
			target="_blank"
			className="text-success">View as website</a>
		</li>
	</ul>
)

const Sidebar = ({ installed, checksum, type, children, menu, facebookPageIdentifier, fbAppId, fbAppCanvasId }) => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		{installed ? <ExternalLinksMenu 
			checksum={checksum}
			facebookPageIdentifier={facebookPageIdentifier}
			fbAppId={fbAppId} 
			fbAppCanvasId={fbAppCanvasId} /> : null}
		<ul className="list-unstyled">
			<li><IndexLink to={`/d/apps/${type}/${checksum}`} activeClassName="active">Dashboard</IndexLink></li>
			<li className="hide"><Link to={`/d/apps/${type}/${checksum}/analytics`} activeClassName="active">Analytics</Link></li>
			<li className="hide"><Link to={`/d/apps/${type}/${checksum}/design`} activeClassName="active">Design (Only for Trivia)</Link></li>
			<li className="hide"><Link to="" activeClassName="active">Design <small>(coming soon)</small></Link></li>
			<li><Link to={`/d/apps/${type}/${checksum}/users`} activeClassName="active">Users</Link></li>
		</ul>
		{children}
		<ul className="list-unstyled">
			<li>
				<Link to={`/d/apps/${type}/${checksum}/preferences`} activeClassName="active">Preferences</Link>
				<ul className="list-unstyled">
					<li className="hide"><Link to={`/d/apps/${type}/${checksum}/preferences`}>Localization</Link></li>
					<li className="hide"><Link to={`/d/apps/${type}/${checksum}/preferences`}>Custom Scripts</Link></li>
					<li><Link to={`/d/apps/${type}/${checksum}/preferences/delete`}><span className="text-red">Delete App</span></Link></li>
				</ul>
			</li>
		</ul>
	</div>
)

export default Sidebar