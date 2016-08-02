import React, { PropTypes } from 'react'

const FbPhoto = ({ className, identifier }) => (
	<img className={className} src={`https://graph.facebook.com/${identifier}/picture?type=square`} />
)

export default FbPhoto