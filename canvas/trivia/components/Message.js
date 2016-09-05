import React from 'react'

const Message = ({ title, foot }) => (
	<div className="col-sm-12">
		<div dangerouslySetInnerHTML={{__html: title}}></div>
		<div dangerouslySetInnerHTML={{__html: foot}}></div>
	</div>
)

export default Message