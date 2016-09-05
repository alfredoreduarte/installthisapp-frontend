import React from 'react'

const Option = ({ text, handleClick }) => (
	<a className="list-group-item ita-cali-option-block" onClick={() => handleClick()}>
		<i className="h4 ita-checkbox-icon animated zoomIn"></i>
		<h4 className="list-group-item-heading">{text}</h4>
	</a>
)

export default Option