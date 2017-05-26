import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

const Header = ({ 
	logoImage,
	homeUrl,
}) => (
	<div style={styles.container} className="ita-cali-mobile-topbar">
		<Link to={homeUrl}>
			<img src={logoImage} style={styles.logo} />
		</Link>
	</div>
)

const styles = {
	container: {
		display: 'flex',
		height: '50px',
		padding: '15px',
	},
	logo: {
		height: '20px',
	}
}

Header.propTypes = {
	logoImage: PropTypes.string,
	homeUrl: PropTypes.string.isRequired,
}

export default Header