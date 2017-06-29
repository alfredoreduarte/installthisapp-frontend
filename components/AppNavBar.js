import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { push } from 'react-router-redux'
import { logOut } from 'actions/admin'
import FbPhoto from 'components/FbPhoto'
import StatusIndicator from 'components/StatusIndicator'

const AppNavBar = ({ adminId, name, identifier, logout, subscription, remainingTrialDays }) => (
	<Navbar fluid={true}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/d">
					<img src="/images/logo-v3.png" style={{height: "28px"}} />
				</IndexLink>
			</Navbar.Brand>
		</Navbar.Header>
		<div className="collapse navbar-collapse text-right">
			<ul className="nav navbar-nav navbar-right" style={{
				display: 'flex',
				alignItems: 'center',
			}}>
				{subscription ? 
					null
				:
				<li>
					<a href='?offer=trial-ended' className="link-no-underline text-success">
						<small>{remainingTrialDays} | UPGRADE</small>
					</a>
				</li>
				}
				<li className="hide">
					<button className="btn btn-success btn-sm btn-outline navbar-btn">
						<Link to='/d/apps/create' className="link-no-underline text-success">
							New App
						</Link>
					</button>
				</li>
				<NavDropdown 
					eventKey={3} 
					title={
						identifier ? <FbPhoto 
							identifier={parseInt(identifier)} 
							width={42} 
							height={42} 
							className="img-circle"
						/>
						: <img
							src={`/images/user-placeholders/${adminId % 8}.png`}
							width="42px"
							height="42px"
						/>
					} 
					id="account-dropdown">
					<LinkContainer className="" to={{ pathname: '/d/account' }}>
						<MenuItem eventKey={3.3}>
							<span>My Account
							{name ? <span></span> : <span style={{marginLeft: '5px'}}><StatusIndicator active={true} status={'red'} /></span>}
							</span>
						</MenuItem>
					</LinkContainer>
					<MenuItem eventKey={3.2} href="javascript:void(0)" onClick={logout}>Logout</MenuItem>
				</NavDropdown>
			</ul>
		</div>
	</Navbar>
)

const mapStateToProps = (state) => {
	const timeDifference = 7 - moment().diff(moment(state.admin.createdAt), 'days')
	const remainingTrialDays = timeDifference > 0 ? <b>{timeDifference} days remaining</b> : <b>Free trial expired</b>
	return { 
		name: state.admin.name,
		adminId: state.admin.id,
		subscription: state.admin.subscription,
		identifier: state.admin.fbProfile ? state.admin.fbProfile.identifier : null,
		remainingTrialDays,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar)