import React, { PropTypes } from 'react'

const Header = ({ title, subtitle }) => (
	<div style={styles.titleBar}>
		<div className="ita-cali-title">This is the main heading</div>
		<div className="ita-cali-subtitle">Nibh Mattis Ridiculus Egestas</div>
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