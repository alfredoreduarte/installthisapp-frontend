import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Footer = ({ 
	copy,
	homeUrl,
}) => (
	<div style={styles.container}><span style={styles.copy}>{copy}</span></div>
)

const layout = {
	container: {
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

const variableStyles = {
	container: {
		background: '#6A588B',
	},
	copy: {
		lineHeight: 1.5,
		textAlign: 'center',
		color: '#ffffff',
		letterSpacing: '0px',
		fontSize: '14px',
		fontFamily: 'Montserrat',
		fontWeight: 'normal',
		fontStyle: 'normal',
		textDecoration: 'none',
		textTransform: 'none',
	}
}

const styles = _.merge(layout, variableStyles)

Footer.propTypes = {
	copy: PropTypes.string,
}

export default Footer