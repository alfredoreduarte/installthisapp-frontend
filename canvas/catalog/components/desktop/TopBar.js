import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

const Header = ({ 
	copy,
}) => (
	<div style={styles.container} className="ita-cali-desktop-topbar">
		<span style={styles.copy} className="ita-cali-desktop-topbar-text">{copy}</span>
	</div>
)

const styles = {
	container: {
		boxSizing: 'border-box',
		display: 'flex',
		height: '50px',
		padding: '15px',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	copy: {
		height: '20px',
	}
}

Header.propTypes = {
	copy: PropTypes.string,
}

export default Header