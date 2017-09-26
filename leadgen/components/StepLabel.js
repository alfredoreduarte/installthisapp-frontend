import React from 'react'

const StepLabel = ({ 
	number
}) => 
<p className="text-primary" style={{
	textTransform: 'uppercase', 
	fontSize: '10px', 
	fontWeight: 'bold',
	textAlign: 'center',
}}>Step {number} of 5</p>

export default StepLabel