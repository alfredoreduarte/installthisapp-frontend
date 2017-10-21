import React, { PropTypes } from 'react'
import Select from 'react-select'

const BackgroundAttachment = ({
	values,
	value,
	onChange,
}) => (
	<div>
		<label>Background Attachment</label>
		<br/>
		<Select
			clearable={false}
			value={value}
			options={values}
			onChange={e => onChange(`${e.value}`)}
		/>
	</div>
)

BackgroundAttachment.propTypes = {
	values: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

BackgroundAttachment.defaultProps = {
	values: [
		{ value: 'scroll', label: 'Scroll' },
		{ value: 'fixed', label: 'Fixed' },
		{ value: 'local', label: 'Local' },
		{ value: 'initial', label: 'Initial' },
		{ value: 'inherit', label: 'Inherit' },
	]
}

export default BackgroundAttachment