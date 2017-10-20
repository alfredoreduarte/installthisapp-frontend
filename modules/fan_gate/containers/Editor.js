import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { APP_EDITOR_FORM_NAME } from 'config'

import { setEditorStepIndexWithConditionalScreen } from 'actions/formEditorUI'

import WelcomeForm from 'modules/fan_gate/components/form-editor/WelcomeForm'
import FlyerForm from 'modules/fan_gate/components/form-editor/FlyerForm'
import CodeForm from 'components/form-editor/CodeForm'
import OpenGraphForm from 'components/form-editor/OpenGraphForm'

let Editor = ({ setEditorStep, editorCurrentStep }) => 
<div>
	<WelcomeForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
	<FlyerForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
	<CodeForm onTitleClick={() => setEditorStep(2)} active={editorCurrentStep == 2} />
	<OpenGraphForm onTitleClick={() => setEditorStep(3)} active={editorCurrentStep == 3} />
</div>

Editor = reduxForm({
	form: APP_EDITOR_FORM_NAME,  // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(Editor)

const mapStateToProps = (state, props) => ({
	editorCurrentStep: state.formEditorUI.step,
})

const mapDispatchToProps = (dispatch, props) => ({
	setEditorStep: index => dispatch(setEditorStepIndexWithConditionalScreen(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)