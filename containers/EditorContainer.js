import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// 
import { setEditorStep } from 'actions/formEditorUI'
import { saveForm } from 'modules/form/actions'
import { setCurrentScreen } from 'actions/styles'
import { getSchema } from 'modules/form/selectors/schema'
import Editor from 'components/Editor'

let EditorContainer = props => 
<div className="editor-main-wrapper">
	<div className="">
		<Editor {...props} />
	</div>
</div>

EditorContainer = reduxForm({
	form: 'formEditor',
	// onSubmit: submit,
	// onSubmit: saveForm,
})(EditorContainer)

const selector = formValueSelector('formEditor')

const mapStateToProps = (state, props) => {
	return {
		platform: state.styles.platform,
		editorCurrentStep: state.formEditorUI.formStep,
		initialValues: {
			messages: {...state.styles.messages},
			settings: {...state.styles.settings},
			images: {...state.styles.images},
			schema: getSchema(state),
		},
		selectedValues: {
			welcomeLayout: selector(state, 'settings.welcomeLayout')
		},
	}
}

// Provisorio
const PreviewsForm = require('canvas/form/containers/Previews').default.screens
const screens = {
	form: PreviewsForm,
}
const availableScreens = screens['form']
const stepsThatTriggerScreenChange = [
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

const mapDispatchToProps = (dispatch, props) => ({
	handleSubmit: e => {
		e.preventDefault()
		dispatch(saveForm())
	},
	setEditorStep: step => {
		// change preview screen accordingly
		// Some steps do not trigger screen changes, so:
		if (stepsThatTriggerScreenChange[step].screen) {
			dispatch(setCurrentScreen(stepsThatTriggerScreenChange[step].screen))
		}
		dispatch(setEditorStep(step))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)