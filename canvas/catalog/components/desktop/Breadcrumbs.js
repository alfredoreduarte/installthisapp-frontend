import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Breadcrumbs = ({ homeLabel, homeUrl, childLabel, childUrl }) =>
	<ol className="breadcrumb ita-cali-desktop-breadcrumbs" style={{
		backgroundColor: 'transparent',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderLeftWidth: '0px',
		borderRightWidth: '0px',
		borderRadius: '0px',
		padding: '15px',
	}}>
		<li><Link to={homeUrl} className="ita-cali-desktop-breadcrumbs-home">{homeLabel}</Link></li>
		<li><Link to={childUrl} className="ita-cali-desktop-breadcrumbs-children">{childLabel}</Link></li>
	</ol>

Breadcrumbs.propTypes = {
	homeLabel: PropTypes.string.isRequired,
	homeUrl: PropTypes.string.isRequired,
	childLabel: PropTypes.string,
	childUrl: PropTypes.string,
}

export default Breadcrumbs