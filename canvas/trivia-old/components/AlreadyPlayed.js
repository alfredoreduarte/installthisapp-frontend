import React from 'react'

const AlreadyPlayed = ({ title, foot }) => (
	<div className="col-sm-12">
		<h1 className="ita-cali-message-text" data-editable-message-key="alreadyPlayed">{title}</h1>
		<h3 className="hide">{foot}</h3>
	</div>
)

export default AlreadyPlayed