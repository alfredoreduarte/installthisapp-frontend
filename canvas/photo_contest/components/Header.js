import React, { PropTypes } from 'react'

const Header = ({ title, subtitle }) => (
	<div style={styles.titleBar}>
		<div className="ita-cali-title" data-editable-message-key="title">{title}</div>
		<div className="ita-cali-subtitle" data-editable-message-key="subtitle">{subtitle}</div>
	</div>
)

const styles = {
	titleBar: {
		paddingTop: 38,
		paddingBottom: 38,
	},
}

Header.propTypes = {
	title: PropTypes.string.isRequired, 
	subtitle: PropTypes.string.isRequired,
}

export default Header