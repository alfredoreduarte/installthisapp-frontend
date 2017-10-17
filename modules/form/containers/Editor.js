import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { APP_EDITOR_FORM_NAME } from 'config'

import { setEditorStepIndexWithConditionalScreen } from 'actions/formEditorUI'
import WelcomeForm from 'components/form-editor/WelcomeForm'
import EntryForm from 'modules/form/components/form-editor/EntryForm'
import LegalForm from 'components/form-editor/LegalForm'
import ThankYouForm from 'components/form-editor/ThankYouForm'

import { getSchema } from 'modules/form/selectors/schema'

let Editor = ({ setEditorStep, editorCurrentStep }) => 
<div>
	<WelcomeForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
	<EntryForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
	<LegalForm onTitleClick={() => setEditorStep(2)} active={editorCurrentStep == 2} />
	<ThankYouForm onTitleClick={() => setEditorStep(3)} active={editorCurrentStep == 3} />
</div>

Editor = reduxForm({
	form: APP_EDITOR_FORM_NAME,  // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(Editor)

const mapStateToProps = (state, props) => ({
	editorCurrentStep: state.formEditorUI.step,
	initialValues: {
		...state.form.formEditor,
		schema: getSchema(state),
	}
})

const mapDispatchToProps = (dispatch, props) => ({
	setEditorStep: index => dispatch(setEditorStepIndexWithConditionalScreen(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)