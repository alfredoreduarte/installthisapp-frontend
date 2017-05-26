import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

const LogoBar = ({ 
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
		padding: '35px 0px',
	},
	logo: {
		height: '20px',
	}
}

LogoBar.propTypes = {
	logoImage: PropTypes.string,
	homeUrl: PropTypes.string.isRequired,
}

export default LogoBar