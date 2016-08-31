import React, { PropTypes } from 'react'

const TextAlign = ({
	options,
	value,
	onChange,
}) => (
	<div className="btn-group ita-btn-group-editor" data-toggle="buttons">
		{options.map( o => 
			<label
				key={o} 
				className={`btn ${value == o ? 'active' : null}`} 
				onClick={() => onChange(o)}>
				<span className={`glyphicon glyphicon-align-${o}`}></span>
				<input type="radio" name="text-align" value={o} defaultChecked={value == o} />
			</label>
		)}
	</div>
)

TextAlign.propTypes = {
	options: PropTypes.array,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

TextAlign.defaultProps = {
	options: [
		'left',
		'center',
		'right',
		'justify',
	]
}

export default TextAlign