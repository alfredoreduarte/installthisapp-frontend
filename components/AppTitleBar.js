import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import SearchForm from 'components/SearchForm'
import FbPhoto from 'components/FbPhoto'

const AppTitleBarButtons = ({ status, applicationType, scheduled = false, handleInstall, handleUninstall, handleShare }) => (
	<div>
		{status == 'installed' ? (
			<div>
				<button className="btn btn-lg btn-primary btn-outline" style={{ marginRight: '20px' }} onClick={handleShare}>
					Share
				</button>
				<button
					onClick={() => handleUninstall()}
					className={`btn btn-lg btn-gray btn-outline ${applicationType == 'top_fans' ? 'hide' : ' '}`}>
					Unpublish
				</button>
			</div>
		) : (
			''
		)}

		{status == 'uninstalled' || status == 'ready' ? (
			<button
				onClick={() => handleInstall()}
				className={`btn btn-lg btn-success ${applicationType == 'top_fans' ? 'hide' : ' '}`}>
				Publish
			</button>
		) : (
			''
		)}

		{status == 'installing' ? (
			<button className="btn btn-lg btn-success" disabled>
				Publishing...
			</button>
		) : (
			''
		)}

		{status == 'uninstalling' ? (
			<div>
				<button className="btn btn-lg btn-gray btn-outline" disabled>
					Unpublishing
				</button>
			</div>
		) : (
			''
		)}

		{scheduled ? (
			<ul className="list-inline">
				<li>
					<small>
						<a href="">
							<u>
								Scheduled for <b>Wed 14, Sept.</b>
							</u>
						</a>
					</small>
				</li>
			</ul>
		) : (
			<ul className="list-inline">
				<li className="hide">
					<p>
						<small>
							<a href="javascript:void(0)">
								<u>Schedule</u>
							</a>
						</small>
					</p>
				</li>
				<li className="hide">
					<p>
						<small>
							<a href="javascript:void(0)">
								<u>Preview</u>
							</a>
						</small>
					</p>
				</li>
			</ul>
		)}
	</div>
)

const AppTitleBar = ({
	installed,
	scheduled = false,
	title,
	// facebookPageIdentifier,
	applicationType,
	status,
	handleInstall,
	handleUninstall,
	handleShare,
}) => (
	<div>
		<div className="col-md-12 ita-main-app-toolbar">
			<div className="row">
				<div className="col-md-6">
					<div className="ita-breadcrumb">
						<ul className="list-inline ita-breadcrumb-list">
							<li>
								<IndexLink to="/">
									<img className="img-rounded" src={`/images/module-icons/${applicationType}.png`} />
								</IndexLink>
							</li>
							<li className="weight-thin text-primary">
								<span className="h1 weight-thin text-primary">{title}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className={`col-md-6 text-right`}>
					<AppTitleBarButtons
						status={status}
						applicationType={applicationType}
						handleInstall={handleInstall}
						handleUninstall={handleUninstall}
						handleShare={handleShare}
					/>
				</div>
			</div>
		</div>
	</div>
)

export default AppTitleBar
