import React, { PropTypes } from 'react'

const FbPhoto = ({ className, identifier, width, height, style }) => (
	<img 
		className={className} 
		// src={`https://graph.facebook.com/${identifier}/picture?type=square`}
		src={`https://graph.facebook.com/${identifier}/picture?width=100&height=100`}
		style={{...style, width: width, height: height}}
	/>
)

FbPhoto.propTypes = {
	className: PropTypes.string,
	identifier: PropTypes.number.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
}

export default FbPhoto