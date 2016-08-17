import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import SearchForm from 'components/SearchForm'
import FbPhoto from 'components/FbPhoto'

const AppTitleBarButtons = ({ 
	status,
	scheduled = false,
	handleInstall,
	handleUninstall,
}) => (
	<div>
		{status == 'installed' ?
			<div>
				<button className="btn btn-lg btn-primary btn-outline">Share</button>
				<button onClick={() => handleUninstall()} className="btn btn-lg btn-gray btn-outline">Uninstall</button>
			</div>
		:	
			""
		}

		{status == 'uninstalled' || status == 'ready' ?
			<button onClick={() => handleInstall()} className="btn btn-lg btn-success">Install</button>
		:	
			""
		}

		{status == 'installing' ?
			<button className="btn btn-lg btn-success" disabled>Installing...</button>
		:
			""
		}

		{status == 'uninstalling' ?
			<div>
				<button className="btn btn-lg btn-primary btn-outline" disabled>Share</button>
				<button className="btn btn-lg btn-gray btn-outline" disabled>Uninstalling</button>
			</div>
		:
			""
		}
		
		{scheduled ? 
			<ul className="list-inline"><li><small><a href=""><u>Scheduled for <b>Wed 14, Sept.</b></u></a></small></li></ul>
		:
			<ul className="list-inline">
				<li><p><small><a href="javascript:void(0)"><u>Schedule</u></a></small></p></li>
				<li><p><small><a href="javascript:void(0)"><u>Preview</u></a></small></p></li>
			</ul>
		}
	</div>
)

const AppTitleBar = ({ 
	installed, 
	scheduled = false, 
	title, 
	facebookPageIdentifier, 
	status, 
	handleInstall, 
	handleUninstall
}) => (
	<div>
		<div className="col-md-12 ita-main-app-toolbar">
			<div className="row">
				<div className="col-md-6">
					<div className="ita-breadcrumb">
						<ul className="list-inline ita-breadcrumb-list">
							<li>
								<IndexLink to="/">
									<FbPhoto identifier={facebookPageIdentifier} />
								</IndexLink>
							</li>
							<li className="weight-thin text-primary">
								<span className="h1 weight-thin text-primary">{title}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-md-6 text-right">
					<AppTitleBarButtons status={status} handleInstall={handleInstall} handleUninstall={handleUninstall} />
				</div>
			</div>
		</div>
	</div>
)

export default AppTitleBar