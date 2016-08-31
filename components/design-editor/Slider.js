import React, { PropTypes } from 'react'
import _ from 'lodash'
import Slider from 'react-rangeslider'

const SliderControl = ({
	value,
	property,
	onChange,
}) => (
	<div className="ita-flex-box ita-flex-box-horizontal">
		<div className="ita-flex-shrink">
			<label>
				{_.capitalize(_.replace(property, '-', ' '))}
			</label>
		</div>
		<div className="ita-flex-block ita-flex-box ita-flex-items-center">
			<Slider
				value={parseInt(value)}
				min={0}
				max={100}
				onChange={val => onChange(val + 'px')} />
		</div>
		<div className="ita-flex-shrink">
			<input 
				type="text" 
				value={parseInt(value)} 
				className="form-control input-sm text-center" 
				maxLength="3"
				size="3"
				onChange={e => onChange(e.target.value + 'px')} />
		</div>
	</div>
)

SliderControl.propTypes = {
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default SliderControl