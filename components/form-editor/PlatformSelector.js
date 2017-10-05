import React from 'react'
import { connect } from 'react-redux'
import { setPlatform } from 'actions/styles'

const PlatformSelector = ({ platform, handlePlatformChange }) => 
<div className="btn-group ita-btn-group-editor" role="group" data-toggle="buttons">
	<button 
		type="button" 
		className={`btn btn-sm btn-default ${platform == 'desktop' ? 'active' : ''}`} 
		onClick={() => handlePlatformChange('desktop')}>
		<span className="glyphicon glyphicon-king hide"></span>
		DESKTOP
	</button>
	<button 
		type="button" 
		className={`btn btn-sm btn-default ${platform == 'mobile' ? 'active' : ''}`} 
		onClick={() => handlePlatformChange('mobile')}>
		<span className="glyphicon glyphicon-phone hide"></span>
		MOBILE
	</button>
</div>

const mapStateToProps = (state, props) => {
	return {
		platform: state.styles.platform,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handlePlatformChange: platform => dispatch(setPlatform(platform)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlatformSelector)