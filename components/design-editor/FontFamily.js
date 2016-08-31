import React, { PropTypes } from 'react'
import Select from 'react-select'

const FontFamily = ({
	values,
	onChange,
	value,
}) => (
	<Select
		clearable={false}
		value={value.slice(1, -1)}
		options={values}
		onChange={e => onChange(`"${e.value}"`)}
	/>
)

FontFamily.propTypes = {
	values: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

FontFamily.defaultProps = {
	values: [
		{ value: 'Times New Roman', label: 'Times New Roman' },
		{ value: 'Arial', label: 'Arial' },
		{ value: 'Verdana', label: 'Verdana' },
		{ value: 'Helvetica', label: 'Helvetica' },
		{ value: 'Georgia', label: 'Georgia' },
		{ value: 'Open Sans', label: 'Open Sans' },
		{ value: 'Oswald', label: 'Oswald' },
		{ value: 'Proxima Nova', label: 'Proxima Nova' },
	]
}

export default FontFamily