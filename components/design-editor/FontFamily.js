import React, { PropTypes } from 'react'
import Select from'react-select'

const FontFamily = ({
	values = [
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Verdana', label: 'Verdana' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Georgia', label: 'Georgia' },
		{ value: 'Open Sans', label: 'Open Sans' },
		{ value: 'Oswald', label: 'Oswald' },
		{ value: 'Proxima Nova', label: 'Proxima Nova' },
	],
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
	// values: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
}

export default FontFamily