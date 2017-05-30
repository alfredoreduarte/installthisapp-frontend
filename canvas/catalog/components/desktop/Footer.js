import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Footer = ({ 
	copy,
}) => (
	<div style={styles.container} className="ita-cali-desktop-footer">
		<span style={styles.copy} className="ita-cali-desktop-footer-text">{copy}</span>
	</div>
)

const styles = {
	container: {
		marginTop: '26px',
		boxSizing: 'border-box',
		display: 'flex',
		height: '50px',
		padding: '15px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	copy: {
		height: '20px',
	}
}

Footer.propTypes = {
	copy: PropTypes.string,
}

export default Footer