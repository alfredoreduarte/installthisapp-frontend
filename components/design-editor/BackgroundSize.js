import React, { PropTypes } from 'react'
import Select from 'react-select'

const BackgroundSize = ({ values, value, onChange }) => (
	<div>
		<label>Background Size</label>
		<br />
		<Select clearable={false} value={value} options={values} onChange={e => onChange(`${e.value}`)} />
	</div>
)

BackgroundSize.propTypes = {
	values: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

BackgroundSize.defaultProps = {
	values: [{ value: 'cover', label: 'Auto Stretch' }, { value: 'auto', label: 'Original' }],
}

export default BackgroundSize
