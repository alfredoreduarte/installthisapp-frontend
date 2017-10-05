import React from 'react'
import _ from 'lodash'
import Frame from 'react-frame-component'
import { connect } from 'react-redux'
import TiMediaPlayReverse from 'react-icons/lib/ti/media-play-reverse'
import TiMediaPlay from 'react-icons/lib/ti/media-play'
import { setCurrentScreen } from 'actions/styles'
import Previews from 'canvas/form/containers/Previews'
import PlatformSelector from 'components/form-editor/PlatformSelector'

const PreviewsForm = require('canvas/form/containers/Previews').default.screens
// Provisorio

const screens = {
	form: PreviewsForm,
}

const EditorPreview = ({ platform, handleScreenChange, currentScreen, screensLength, currentScreenIndex, currentScreenLabel, availableScreens }) => 
<div className={`editor-preview-column ${platform}`}>
	<Frame 
		className={`editor-preview-frame ${platform}`}
		head={<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />}>
		<Previews />
	</Frame>
	<div className="editor-preview-navigation">
		{false && <PlatformSelector />}
		<div className="editor-preview-title text-center">
			{currentScreenLabel}
		</div>
		<div className="editor-preview-navigation-buttons">
			{currentScreenIndex > 0 && <TiMediaPlayReverse 
				size={20} 
				className="editor-preview-navigation-arrow" 
				onClick={() => handleScreenChange(currentScreenIndex - 1)} />}
			<div className="editor-preview-page-number">{currentScreenIndex + 1} of {availableScreens.length}</div>
			{currentScreenIndex < screensLength && <TiMediaPlay 
				size={20} 
				className="editor-preview-navigation-arrow" 
				onClick={() => handleScreenChange(currentScreenIndex + 1)} />}
		</div>
	</div>
</div>

const mapStateToProps = (state, props) => {
	const screenObject = _.find(screens['form'], {'value': state.styles.screen})
	const availableScreens = screens['form']
	return {
		screensLength: availableScreens.length,
		currentScreen: state.styles.screen,
		currentScreenIndex: availableScreens.indexOf(screenObject),
		currentScreenLabel: screenObject.label,
		availableScreens: availableScreens,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleScreenChange: screenIndex => {
		dispatch(setCurrentScreen(screens['form'][screenIndex].value))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPreview)