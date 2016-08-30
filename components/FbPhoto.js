import React, { PropTypes } from 'react'

const FbPhoto = ({ className, identifier, width, height }) => (
	<img 
		className={className} 
		src={`https://graph.facebook.com/${identifier}/picture?type=large`}
		style={{width, height}}
	/>
)

export default FbPhoto