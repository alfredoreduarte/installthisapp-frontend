import React, { PropTypes } from 'react'
import Select from'react-select'

const ScreenSelector = ({
	handleScreenChange,
	value,
	options,
}) => (
	<Select
		clearable={false}
		className="react-select-top"
		searchable={false}
		style={{width: '200px'}}
		onChange={handleScreenChange}
		value={value}
		options={options}
	/>
)

ScreenSelector.propTypes = {
	handleScreenChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired
}

export default ScreenSelector