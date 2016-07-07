import React, { Component, PropTypes } from 'react'
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
	handleChange = e => console.log('changed font family!', e.label),
	defaultValue = 'Georgia'
}) => (
	<Select
		clearable={false}
		value={defaultValue}
		options={values}
		onChange={handleChange}
	/>
)

export default FontFamily