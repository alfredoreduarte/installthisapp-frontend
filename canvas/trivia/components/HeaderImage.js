import React, { PropTypes } from 'react'

const HeaderImage = ({ source }) => (
	<div style={{textAlign: 'center'}}>
		<img src={source} style={styles.img} />
	</div>
)

const styles = {
	img: {
		// marginBottom: '38px',
		width: 'auto',
		maxWidth: '100%',
	}
}

HeaderImage.propTypes = {
	// source: PropTypes.string.isRequired,
}

export default HeaderImage