import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

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

const layout = {
	container: {
		display: 'flex',
		height: '50px',
		padding: '15px',
	},
	logo: {
		height: '20px',
	}
}

const variableStyles = {
	container: {
		background: '#6A588B',
	},
	logo: {
		
	}
}

const styles = _.merge(layout, variableStyles)

Header.propTypes = {
	logoImage: PropTypes.string,
	homeUrl: PropTypes.string.isRequired,
}

export default Header