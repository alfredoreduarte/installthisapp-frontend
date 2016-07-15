import React, { PropTypes } from 'react'

const PlatformSelector = ({
	platform,
	handlePlatformChange
}) => (
	<div className="btn-group ita-btn-group-editor" role="group" data-toggle="buttons">
		<button 
			type="button" 
			className={`btn btn-default ${platform == 'facebook' ? 'active' : ''}`} 
			onClick={() => handlePlatformChange('facebook')}>
			<span className="glyphicon glyphicon-king"></span>
		</button>
		<button 
			type="button" 
			className={`btn btn-default ${platform == 'mobile' ? 'active' : ''}`} 
			onClick={() => handlePlatformChange('mobile')}>
			<span className="glyphicon glyphicon-phone"></span>
		</button>
	</div>
)

PlatformSelector.propTypes = {
	handlePlatformChange: PropTypes.func.isRequired,
	platform: PropTypes.string.isRequired,
}

export default PlatformSelector