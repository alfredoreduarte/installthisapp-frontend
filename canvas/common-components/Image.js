import React, { PropTypes } from 'react'

const Image = ({ source }) => <div style={styles.container}>{source && <img src={source} style={styles.img} />}</div>

const styles = {
	container: {
		textAlign: 'center',
	},
	img: {
		maxWidth: '100%',
	},
}

Image.propTypes = {
	source: PropTypes.string,
}

export default Image
