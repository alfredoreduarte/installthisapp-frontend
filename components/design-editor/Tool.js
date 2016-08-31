import React, { PropTypes } from 'react'
import FontFamily from 'components/design-editor/FontFamily'

const Tool = ({ property, value, handleChange }) => {
	switch (property){
		case 'font-family':
			return <FontFamily onChange={val => handleChange(property, val)} value={value} />
			break
		default:
			return <div>
				<label>{property}</label>
				<input 
					type="text" 
					className="form-control" 
					value={value} 
					onChange={e => handleChange(property, e.target.value)} />
			</div>
	}
}

export default Tool