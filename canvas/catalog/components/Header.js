import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

const Header = ({ 
	logoImage,
	homeUrl,
}) => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>
				<Link to={homeUrl}>
					<img src={logoImage} style={{
						height: '20px',
					}} />
				</Link>
			</Navbar.Brand>
		</Navbar.Header>
		<Nav>
			<NavItem eventKey={1} href="#">Link</NavItem>
			<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
				<MenuItem eventKey={3.1}>Action</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey={3.4}>Separated link</MenuItem>
			</NavDropdown>
		</Nav>
	</Navbar>
)

Header.propTypes = {
	logoImage: PropTypes.string,
	homeUrl: PropTypes.string.isRequired,
}

export default Header