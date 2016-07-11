import React, { PropTypes } from 'react'

const ResetButton = ({
	handleReset
}) => (
	<div>
		<button 
			className="btn btn-default text-muted" 
			onClick={() => handleReset()} 
			style={{cursor: 'pointer'}}>
			<i className="glyphicon glyphicon-fast-backward"></i> Reset to defaults
		</button>
	</div>
)

ResetButton.propTypes = {
	handleReset: PropTypes.func.isRequired
}

export default ResetButton