import React from 'react'
import _ from 'lodash'
import Frame from 'react-frame-component'
import { connect } from 'react-redux'
import TiMediaPlayReverse from 'react-icons/lib/ti/media-play-reverse'
import TiMediaPlay from 'react-icons/lib/ti/media-play'
import { setCurrentScreen } from 'actions/styles'
import Preview from 'components/form-editor/Preview'

// Provisorio
import Previews from 'canvas/form/containers/Previews'
const PreviewsForm = require('canvas/form/containers/Previews').default.screens
// Provisorio

const screens = {
	form: PreviewsForm,
}

const PreviewContainer = props => <Preview {...props} />

const mapStateToProps = (state, props) => {
	const screenObject = _.find(screens['form'], {'value': state.styles.screen})
	const availableScreens = screens['form']
	return {
		previews: <Previews />,
		platform: state.styles.platform,
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer)