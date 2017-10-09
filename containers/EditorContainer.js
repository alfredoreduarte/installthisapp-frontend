import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// 
import { setEditorStep } from 'actions/formEditorUI'
import { setCurrentScreen } from 'actions/styles'
import Editor from 'components/form-editor/Editor'

import { saveForm } from 'modules/form/actions'
import { getSchema } from 'modules/form/selectors/schema'

let EditorContainer = props => <div className="editor-main-wrapper"><Editor {...props} /></div>

const reduxFormName =  'formEditor'

EditorContainer = reduxForm({
	form: reduxFormName,
})(EditorContainer)

// Provisorio
const currentModule = 'form' // -----> Dynamize this!
const PreviewsForm = require('canvas/form/containers/Previews').default.screens
const screens = {
	form: PreviewsForm,
}
const availableScreens = screens['form']
const editorSteps = [
	{
		step: 0,
		screen: availableScreens[0].value,
	},
	{
		step: 1,
		screen: availableScreens[1].value,
	},
	{
		step: 2,
		screen: null,
	},
	{
		step: 3,
		screen: availableScreens[2].value,
	},
]

const mapStateToProps = (state, props) => {
	return {
		steps: editorSteps,
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
	setEditorStep: step => {
		// change preview screen accordingly
		// Some steps do not trigger screen changes, so:
		if (stepsThatTriggerScreenChange[step].screen) {
			dispatch(setCurrentScreen(editorSteps[step].screen))
		}
		dispatch(setEditorStep(step))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)