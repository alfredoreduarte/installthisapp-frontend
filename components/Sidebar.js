import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const ExternalLinksMenu = ({ checksum, appType, fbPageIdentifier, fbAppId, fbAppCanvasId }) => (
	<div>
		<ul className="list-unstyled">
			{fbPageIdentifier && fbAppId ? (
				<li>
					<a
						href={`https://facebook.com/pages/${fbPageIdentifier}/${fbPageIdentifier}?sk=app_${fbAppId}`}
						target="_blank"
						rel="noopener"
						className="text-primary">
						View on Facebook{' '}
						<small>
							<span className="glyphicon glyphicon-share" />
						</small>
					</a>
				</li>
			) : null}
			<li>
				<a
					// href={`/${fbAppCanvasId}/${checksum}`}
					href={`/gateway/${checksum}`}
					target="_blank"
					rel="noopener"
					className="text-success">
					Go to app{' '}
					<small>
						<span className="glyphicon glyphicon-share" />
					</small>
				</a>
			</li>
		</ul>
		<hr />
	</div>
)

const Sidebar = ({ installed, checksum, type, children, menu, facebookPageIdentifier, fbAppId, fbAppCanvasId }) => (
	<div className="col-md-2 col-xs-12 ita-main-menu">
		{installed ? (
			<ExternalLinksMenu
				checksum={checksum}
				fbPageIdentifier={facebookPageIdentifier}
				fbAppId={fbAppId}
				appType={type}
				fbAppCanvasId={fbAppCanvasId}
			/>
		) : null}
		<ul className="list-unstyled">
			<li>
				<IndexLink to={`/d/apps/${type}/${checksum}`} activeClassName="active">
					Dashboard
				</IndexLink>
			</li>
			<li className="hide">
				<Link to={`/d/apps/${type}/${checksum}/analytics`} activeClassName="active">
					Analytics
				</Link>
			</li>
			<li className="hide">
				<Link to={`/d/apps/${type}/${checksum}/integrations`} activeClassName="active">
					Facebook Tab
				</Link>
			</li>
			{type != 'form' &&
				type != 'fan_gate' &&
				type != 'coupons' &&
				type != 'photo_contest' &&
				type != 'capture_the_flag' &&
				type != 'promo_code' &&
				type != 'static_html' && (
					<li>
						<Link to={`/d/apps/${type}/${checksum}/design`} activeClassName="active">
							Design
						</Link>
					</li>
				)}
			{(type == 'form' ||
				type == 'fan_gate' ||
				type == 'coupons' ||
				type == 'static_html' ||
				type == 'photo_contest' ||
				type == 'promo_code' ||
				type == 'capture_the_flag') && (
				<li>
					<Link to={`/d/apps/${type}/${checksum}/editor`} activeClassName="active">
						Editor
					</Link>
				</li>
			)}
			<li className="hide">
				<Link to={`/d/apps/${type}/${checksum}/users`} activeClassName="active">
					Users
				</Link>
			</li>
		</ul>
		{children}
		<ul className="list-unstyled">
			<li>
				<Link to={`/d/apps/${type}/${checksum}/integrations`} activeClassName="active">
					Integrations
				</Link>
			</li>
			<li>
				<Link to={`/d/apps/${type}/${checksum}/preferences`} activeClassName="active">
					Preferences
				</Link>
				<ul className="list-unstyled">
					{type != 'fan_gate' &&
						type != 'static_html' && (
							<li>
								<Link to={`/d/apps/${type}/${checksum}/preferences/specific`} activeClassName="active">
									App-specific settings
								</Link>
							</li>
						)}
					<li className="hide">
						<Link to={`/d/apps/${type}/${checksum}/preferences`}>Localization</Link>
					</li>
					<li className="hide">
						<Link to={`/d/apps/${type}/${checksum}/preferences`}>Custom Scripts</Link>
					</li>
					<li className="hide">
						<Link to={`/d/apps/${type}/${checksum}/preferences/delete`}>
							<span className="text-red">Delete App</span>
						</Link>
					</li>
				</ul>
			</li>
		</ul>
		<hr />
		<ul className={`list-unstyled ${type == 'top_fans' ? ' ' : 'hide'}`}>
			<li>
				<Link to={`/d/apps/${type}/${checksum}/setup-guide`} activeClassName="active">
					Setup Guide
				</Link>
			</li>
		</ul>
	</div>
)

export default Sidebar
