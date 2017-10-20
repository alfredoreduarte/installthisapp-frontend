import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { APP_EDITOR_FORM_NAME } from 'config'

import { setEditorStepIndexWithConditionalScreen } from 'actions/formEditorUI'

import HtmlContentForm from 'modules/static_html/components/form-editor/HtmlContentForm'
import OpenGraphForm from 'components/form-editor/OpenGraphForm'

let Editor = ({ setEditorStep, editorCurrentStep }) => 
<div>
	<HtmlContentForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
	<OpenGraphForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
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