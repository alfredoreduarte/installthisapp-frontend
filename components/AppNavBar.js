import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { push } from 'react-router-redux'
import { logOut } from 'actions/admin'
import FbPhoto from 'components/FbPhoto'

const AppNavBar = ({ name, identifier, logout }) => (
	<Navbar fluid={true}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/d"><b>Install</b>This<b>App</b></IndexLink>
			</Navbar.Brand>
		</Navbar.Header>
		<div className="collapse navbar-collapse text-right">
			<ul className="nav navbar-nav navbar-right">
				<li className="">
					<a 
						style={{paddingTop: '20px', paddingBottom: '20px'}}
						href='https://installthisapp.com/pricing' 
						target="_blank"
						className="link-no-underline text-success"><small>UPGRADE</small></a>
				</li>
				<li className="hide">
					<button className="btn btn-success btn-sm btn-outline navbar-btn">
						<Link to='/d/apps/create' className="link-no-underline text-success">
							New App
						</Link>
					</button>
				</li>
				<NavDropdown eventKey={3} title={<FbPhoto identifier={parseInt(identifier)} width={32} height={32} className="img-circle" />} id="account-dropdown">
					<LinkContainer to={{ pathname: '/d/account' }}>
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
		identifier: state.admin.identifier,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);