import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { push } from 'react-router-redux'
import { logOut } from 'actions/admin'
import FbPhoto from 'components/FbPhoto'

const AppNavBar = ({ name, identifier, logout, subscription }) => (
	<Navbar fluid={true}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/d">
					<img src="/images/logo-round.png" style={{height: "40px"}} />
				</IndexLink>
			</Navbar.Brand>
		</Navbar.Header>
		<div className="collapse navbar-collapse text-right">
			<ul className="nav navbar-nav navbar-right">
				{subscription ? 
					null
				:
				<li>
					<Link to='/d/upgrade' className="link-no-underline text-success">
						<small>UPGRADE</small>
					</Link>
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
						<FbPhoto 
						identifier={parseInt(identifier)} 
						width={26} 
						height={26} 
						className="img-circle" />
					} 
					id="account-dropdown">
					<LinkContainer className="" to={{ pathname: '/d/account' }}>
						<MenuItem eventKey={3.3}>
							My Account
						</MenuItem>
					</LinkContainer>
					<MenuItem eventKey={3.2} href="javascript:void(0)" onClick={logout}>Logout</MenuItem>
				</NavDropdown>
			</ul>
		</div>
	</Navbar>
)

const mapStateToProps = (state) => {
	return { 
		name: state.admin.name,
		subscription: state.admin.subscription,
		identifier: state.admin.fbProfile ? state.admin.fbProfile.identifier : null,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);