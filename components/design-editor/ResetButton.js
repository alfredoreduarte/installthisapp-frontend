import React, { PropTypes } from 'react'

const ResetButton = ({
	handleReset
}) => (
	<div>
		<a 
			onClick={() => handleReset()} 
			style={{cursor: 'pointer'}}>
			<small><i className="glyphicon glyphicon-repeat"></i> Reset to defaults</small>
		</a>
	</div>
)

ResetButton.propTypes = {
	handleReset: PropTypes.func.isRequired
}

export default ResetButton