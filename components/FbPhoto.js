import React, { PropTypes } from 'react'

const FbPhoto = ({ className, id }) => (
	<img className={className} src={`https://graph.facebook.com/${id}/picture?type=square`} />
)

export default FbPhoto