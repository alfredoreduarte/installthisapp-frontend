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

const layout = {
	container: {
		display: 'flex',
		// height: '50px',
		padding: '35px 0px',
	},
	logo: {
		height: '20px',
	}
}

const variableStyles = {
	container: {
		
	},
	logo: {
		
	}
}

const styles = _.merge(layout, variableStyles)

LogoBar.propTypes = {
	logoImage: PropTypes.string,
	homeUrl: PropTypes.string.isRequired,
}

export default LogoBar