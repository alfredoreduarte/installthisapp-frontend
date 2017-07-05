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
		width: process.env.FB_TAB_WIDTH + 'px',
	},
}

Image.propTypes = {
	source: PropTypes.string.isRequired,
}

export default Image