import React, { PropTypes } from 'react'
import Select from 'react-select'

const ScreenSelector = ({ handleScreenChange, value, options }) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
		}}>
		<span
			style={{
				color: 'white',
				marginRight: '20px',
			}}>
			Current screen:{' '}
		</span>
		<Select
			clearable={false}
			className="react-select-top"
			searchable={false}
			style={{ width: '200px' }}
			onChange={handleScreenChange}
			value={value}
			options={options}
		/>
	</div>
)

ScreenSelector.propTypes = {
	handleScreenChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
}

export default ScreenSelector
