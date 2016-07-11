import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import PlatformSelector from'components/design-editor/PlatformSelector'
import ResetButton from'components/design-editor/ResetButton'
import ScreenSelector from'components/design-editor/ScreenSelector'

const DesignEditorBottomBar = ({

	// Screen Selector
	screens,
	currentScreen,
	handleScreenChange,

	// Platform Selector
	platform,
	handlePlatformChange,

	// Reset design
	resetToDefaults,

}) => (
	<div className="ita-bottom-bar">
		<ScreenSelector
			value={currentScreen}
			options={screens}
			handleScreenChange={handleScreenChange}	
		 />
		<PlatformSelector platform={platform} handlePlatformChange={handlePlatformChange} />
		<ResetButton handleReset={resetToDefaults} />
	</div>
)

DesignEditorBottomBar.propTypes = {
	screens: PropTypes.array.isRequired,
	currentScreen: PropTypes.string.isRequired,
	platform: PropTypes.string.isRequired,
	handleScreenChange: PropTypes.func.isRequired,
	handlePlatformChange: PropTypes.func.isRequired,
	resetToDefaults: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ 
	screens: [
		{ value: 'index', label: 'Inicio'},
		{ value: 'thanks', label: 'Gracias'},
	],
	currentScreen: 'index',
	platform: 'mobile',
})

const mapDispatchToProps = dispatch => ({ 
	handleScreenChange: 	e 			=> console.log('screen changed!', e.label),
	handlePlatformChange: 	platform 	=> console.log('platform changed!', platform),
	resetToDefaults: 		() 			=> console.log('reset to defaults!'),
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignEditorBottomBar)