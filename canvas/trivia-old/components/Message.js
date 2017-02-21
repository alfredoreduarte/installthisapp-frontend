import React from 'react'

const Message = ({ title, foot }) => (
	<div className="col-sm-12">
		<h1 className="ita-cali-message-text">{title}</h1>
		<h3 className="hide">{foot}</h3>
	</div>
)

export default Message