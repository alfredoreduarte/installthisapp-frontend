import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = ({ 
	logoImage,
	homeUrl,
}) => (
	<div style={styles.container}>
		<Link to={homeUrl}>
			<img src={logoImage} style={styles.logo} />
		</Link>
	</div>
)

const styles = {
	container: {
		display: 'flex',
		height: '50px',
		background: 'purple',
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