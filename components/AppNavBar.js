import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { push } from 'react-router-redux'
import Cookies from 'js-cookie'

const AppNavBar = ({ name, logout }) => (
	<Navbar fluid={true}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/d"><b>Install</b>This<b>App</b></IndexLink>
			</Navbar.Brand>
		</Navbar.Header>
		<div className="collapse navbar-collapse text-right">
			<ul className="nav navbar-nav navbar-right">
				<li className="">
					<button className="btn btn-success btn-sm btn-outline navbar-btn">
						<Link to='/d/apps/create' className="link-no-underline text-success">
							New App
						</Link>
					</button>
				</li>
				<NavDropdown eventKey={3} title={name} id="account-dropdown">
					<LinkContainer to={{ pathname: '/d/account' }}>
						<MenuItem eventKey={3.3}>My Account</MenuItem>
					</LinkContainer>
					<MenuItem eventKey={3.2} href="/" onClick={() => logout()}>Logout</MenuItem>
				</NavDropdown>
			</ul>
		</div>
	</Navbar>
)

const mapStateToProps = (state) => {
	return { 
		name: state.admin.name
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => Cookies.remove('api_key')
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);