import React, { PropTypes } from 'react'
import _ from 'lodash'
// import Slider as BootSlider from 'bootstrap-slider'

const Slider = ({
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
		<div className="ita-flex-block">
			<input
				type="range" 
				min="0"
				max="50"
				value={parseInt(value)}
				onChange={e => onChange(e.target.value + 'px')}
			/>
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

Slider.propTypes = {
	value: PropTypes.string.isRequired,
	property: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default Slider