require('isomorphic-fetch')
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
				<li className="">
					<button onClick={ () => {
						fetch('https://local.installthisapp.com/top_fans_realtime', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(
								{ 
									object: "page", 
									entry: [
										{
											id: "187169648074506", 
											changes: [
												{
													value: {
														verb: "add", 
														sender_id: 819249868192387, 
														item: "like", 
														parent_id: "187169648074506_502821043176030", 
														post_id: "187169648074506_502821043176030", 
														created_time: 1468261498, 
														sender_name: "Orxan  Alizade"
													}, 
													field: "feed"
												}
											], 
											time: 1468261498
										}
									]
								}
							)
						})
						.then(response => response.text())
						.then(text =>{
							console.log(text)
						})
					}} className="btn btn-success btn-sm btn-outline navbar-btn">
						Post top fans
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
		name: state.admin.name
	}
}

export default connect(mapStateToProps)(AppNavBar);