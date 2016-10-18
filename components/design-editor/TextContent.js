import React, { PropTypes } from 'react'
import _ from 'lodash'
import Select from 'react-select'
import humps from 'humps'

const TextContent = ({
	keyString,
	value,
	onChange,
}) => (
	<div className="form-group">
		<label>{_.capitalize(_.replace(humps.decamelize(keyString), '_', ' '))}</label>
		<input 
			type="text" 
			className="form-control"
			value={value} 
			onChange={e => onChange(keyString, e.target.value)} />
	</div>
)

TextContent.propTypes = {
	keyString: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default TextContent