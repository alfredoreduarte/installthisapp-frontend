import React from 'react'
import _ from 'lodash'
import { formValueSelector } from 'redux-form'
import Frame from 'react-frame-component'
import { connect } from 'react-redux'
import TiMediaPlayReverse from 'react-icons/lib/ti/media-play-reverse'
import TiMediaPlay from 'react-icons/lib/ti/media-play'
import { APP_EDITOR_FORM_NAME } from 'config'
import { setEditorScreenIndex } from 'actions/formEditorUI'
import { getCurrentAppByState } from 'selectors/apps'
import Preview from 'components/form-editor/Preview'

const PreviewContainer = props => <Preview {...props} />

const previewComponentSelector = appType => require(`canvas/${appType}/containers/Previews`).default

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	const availableScreens = state.formEditorUI.editorScreens
	const currentScreen = availableScreens[state.formEditorUI.screen]
	const Previews = previewComponentSelector( getCurrentAppByState(state).applicationType )
	return {
		previews: <Previews />,
		platform: state.formEditorUI.platform,
		screensLength: availableScreens.length,
		currentScreenIndex: state.formEditorUI.screen,
		currentScreenLabel: currentScreen.label,
		availableScreens: availableScreens,
		styles: `<style>${selector(state, 'css')}<style>`,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleScreenChange: screenIndex => dispatch( setEditorScreenIndex(screenIndex) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer)