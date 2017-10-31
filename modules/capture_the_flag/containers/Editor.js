import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { APP_EDITOR_FORM_NAME } from 'config'

import { setEditorStepIndexWithConditionalScreen } from 'actions/formEditorUI'

import LegalForm from 'components/form-editor/LegalForm'
import CodeForm from 'components/form-editor/CodeForm'
import OpenGraphForm from 'components/form-editor/OpenGraphForm'
import WelcomeForm from 'components/form-editor/WelcomeForm'

import IndexForm from 'modules/capture_the_flag/components/form-editor/IndexForm'
import CaptchaForm from 'modules/capture_the_flag/components/form-editor/CaptchaForm'
import ClaimedForm from 'modules/capture_the_flag/components/form-editor/ClaimedForm'

let Editor = ({ setEditorStep, editorCurrentStep }) => (
	<div>
		<WelcomeForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
		<IndexForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
		<CaptchaForm onTitleClick={() => setEditorStep(2)} active={editorCurrentStep == 2} />
		<ClaimedForm onTitleClick={() => setEditorStep(3)} active={editorCurrentStep == 3} />
		<CodeForm onTitleClick={() => setEditorStep(4)} active={editorCurrentStep == 4} />
		<LegalForm onTitleClick={() => setEditorStep(5)} active={editorCurrentStep == 5} />
		<OpenGraphForm onTitleClick={() => setEditorStep(6)} active={editorCurrentStep == 6} />
	</div>
)

Editor = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(Editor)

const mapStateToProps = (state, props) => ({
	editorCurrentStep: state.formEditorUI.step,
})

const mapDispatchToProps = (dispatch, props) => ({
	setEditorStep: index => dispatch(setEditorStepIndexWithConditionalScreen(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
