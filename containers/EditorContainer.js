import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { APP_EDITOR_FORM_NAME } from 'config'
import { setEditorStepIndexWithConditionalScreen, setEditorScreenIndex, saveAppFromNewEditor } from 'actions/formEditorUI'
import { getCurrentAppByState } from 'selectors/apps'
import Editor from 'components/form-editor/Editor'

let EditorContainer = props => <Editor {...props} />

EditorContainer = reduxForm({
	form: APP_EDITOR_FORM_NAME,
})(EditorContainer)

// Get steps and initial values from a specific module
const stepsComponentSelector = appType => require(`modules/${appType}/containers/Editor`).default
const specificInitialValuesSelector = appType => require(`modules/${appType}/selectors/index`).initialStateSelectorForEditor

const mapStateToProps = (state, props) => {
	const StepsForms = stepsComponentSelector( getCurrentAppByState(state).applicationType )
	const moduleDataSelector = specificInitialValuesSelector( getCurrentAppByState(state).applicationType )
	const initialState = moduleDataSelector(state)
	return {
		steps: state.formEditorUI.editorSteps,
		stepsForms: <StepsForms />,
		editorCurrentStep: state.formEditorUI.step,
		initialValues: {
			messages: {...state.styles.messages},
			settings: {...state.styles.settings},
			images: {...state.styles.images},
			...initialState,
		}
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleClose: () => browserHistory.goBack(),
	handleSubmit: e => {
		e.preventDefault()
		dispatch( saveAppFromNewEditor() )
	},
	setEditorStep: index => dispatch(setEditorStepIndexWithConditionalScreen(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)