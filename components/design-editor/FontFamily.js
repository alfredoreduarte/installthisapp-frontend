import React, { PropTypes } from 'react'
import Select from'react-select'

const FontFamily = ({
	values,
	handleChange,
	defaultValue,
}) => (
	<Select
		clearable={false}
		value={defaultValue}
		options={values}
		onChange={e => handleChange(e.label)}
	/>
)

FontFamily.propTypes = {
	defaultValue: PropTypes.string.isRequired,
	values: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
}

export default FontFamily