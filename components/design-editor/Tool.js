import React, { PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'

const Tool = ({ property, value, handleChange }) => {
	switch (property){
		case 'font-family':
			return <FontFamily onChange={val => handleChange(property, val)} value={value} />
			break
		default:
			return <div>{property}</div>
	}
}

export default Tool