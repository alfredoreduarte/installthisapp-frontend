import React, { PropTypes } from 'react'
import Select from 'react-select'

const BackgroundPosition = ({
	values,
	value,
	onChange,
}) => (
	<div>
		<label>Background Position</label>
		<br/>
		<Select
			clearable={false}
			value={value}
			options={values}
			onChange={e => onChange(`${e.value}`)}
		/>
	</div>
)

BackgroundPosition.propTypes = {
	values: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

BackgroundPosition.defaultProps = {
	values: [
		{ value: 'bottom', label: 'Bottom' },
		{ value: 'center', label: 'Center' },
		{ value: 'left', label: 'Left' },
		{ value: 'right', label: 'Right' },
		{ value: 'top', label: 'Top' },
		{ value: 'unset', label: 'Unset' },
	]
}

export default BackgroundPosition