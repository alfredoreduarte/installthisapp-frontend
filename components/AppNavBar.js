import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

const AppNavBar = ({ name }) => (
	<Navbar fluid={true}>
		<Navbar.Header>
			<Navbar.Brand>
				<IndexLink to="/"><b>Install</b>This<b>App</b></IndexLink>
			</Navbar.Brand>
		</Navbar.Header>
		<div className="collapse navbar-collapse text-right">
			<ul className="nav navbar-nav navbar-right">
				<li className="">
					<button className="btn btn-success btn-sm btn-outline navbar-btn">
						<Link to='/create' className="link-no-underline text-success">
							New App
						</Link>
					</button>
				</li>
				<NavDropdown eventKey={3} title={name}>
					<LinkContainer to={{ pathname: '/account' }}>
						<MenuItem eventKey={3.3}>My Account</MenuItem>
					</LinkContainer>
					<MenuItem eventKey={3.2} href="/logout">Logout</MenuItem>
				</NavDropdown>
			</ul>
		</div>
	</Navbar>
)

const mapStateToProps = (state) => {
	return { 
		name: state.adminUser.name
	}
}

export default connect(mapStateToProps)(AppNavBar);