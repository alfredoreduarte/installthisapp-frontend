import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const AccountSidebar = () => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		<ul className="list-unstyled">
			<li><IndexLink to="/d/account" activeClassName="active">Preferences</IndexLink></li>
			<li className=""><Link to="/d/account/billing" activeClassName="active">Billing</Link></li>
			<li><Link to="/d/account/team" activeClassName="active">Team</Link></li>
			<li><Link to="/d/account/referrals" activeClassName="active">Referrals</Link></li>
		</ul>
	</div>
)

export default AccountSidebar