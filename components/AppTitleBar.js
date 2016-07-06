import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import SearchForm from 'components/SearchForm'

const AppTitleBar = ({ installed, scheduled = false, title }) => (
	<div>
		<div className="col-md-12 ita-main-app-toolbar">
			<div className="row">
				<div className="col-md-6">
					<div className="ita-breadcrumb">
						<ul className="list-inline ita-breadcrumb-list">
							<li>
								<IndexLink to="/">
									<img src="/images/user.jpg" />
								</IndexLink>
							</li>
							<li className="weight-thin text-primary">
								<span className="h1 weight-thin text-primary">{title}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-md-6 text-right">
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
	</div>
)

const mapStateToProps = (state, ownProps) => {
	return { 
		installed: ownProps.status == 'installed' ? true : false
	}
}

export default connect(mapStateToProps)(AppTitleBar)