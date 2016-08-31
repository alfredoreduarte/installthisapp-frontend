import React, { PropTypes } from 'react'
import Select from 'react-select'

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
	onChange,
	value,
}) => (
	<Select
		clearable={false}
		value={value}
		options={values}
		onChange={e => onChange(e.value)}
	/>
)

FontFamily.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default FontFamily