import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { APP_EDITOR_FORM_NAME } from 'config'
import { setEditorStepIndexWithConditionalScreen, setEditorScreenIndex } from 'actions/formEditorUI'
import Editor from 'components/form-editor/Editor'

import { saveForm } from 'modules/form/actions'
import { getSchema } from 'modules/form/selectors/schema'

let EditorContainer = props => <Editor {...props} />

EditorContainer = reduxForm({
	form: APP_EDITOR_FORM_NAME,
})(EditorContainer)

const mapStateToProps = (state, props) => {
	return {
		steps: state.formEditorUI.editorSteps,
		editorCurrentStep: state.formEditorUI.step,
		initialValues: {
			messages: {...state.styles.messages},
			settings: {...state.styles.settings},
			images: {...state.styles.images},
			schema: getSchema(state),
		}
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(saveForm())
	},
	setEditorStep: index => dispatch(setEditorStepIndexWithConditionalScreen(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)