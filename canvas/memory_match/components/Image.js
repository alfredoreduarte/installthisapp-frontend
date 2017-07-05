import React, { PropTypes } from 'react'

const Image = ({ source }) => (
	<div style={styles.container}>
		<img src={source} style={styles.img} />
	</div>
)

const styles = {
	container: {
		textAlign: 'center',
	},
	img: {
		width: '820px',
		maxWidth: '100%',
	},
}

Image.propTypes = {
	source: PropTypes.string.isRequired,
}

export default Image