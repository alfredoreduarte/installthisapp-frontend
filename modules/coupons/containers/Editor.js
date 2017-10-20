import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { APP_EDITOR_FORM_NAME } from 'config'

import { setEditorStepIndexWithConditionalScreen } from 'actions/formEditorUI'

import WelcomeForm from 'components/form-editor/WelcomeForm'
import LegalForm from 'components/form-editor/LegalForm'
import OpenGraphForm from 'components/form-editor/OpenGraphForm'
import ThankYouForm from 'components/form-editor/ThankYouForm'
import CodeForm from 'components/form-editor/CodeForm'

import CouponForm from 'modules/coupons/components/form-editor/CouponForm'
import NoCouponsForm from 'modules/coupons/components/form-editor/NoCouponsForm'

let Editor = ({ setEditorStep, editorCurrentStep }) => 
<div>
	<WelcomeForm onTitleClick={() => setEditorStep(0)} active={editorCurrentStep == 0} />
	<CouponForm onTitleClick={() => setEditorStep(1)} active={editorCurrentStep == 1} />
	<NoCouponsForm onTitleClick={() => setEditorStep(2)} active={editorCurrentStep == 2} />
	<CodeForm onTitleClick={() => setEditorStep(3)} active={editorCurrentStep == 3} />
	<LegalForm onTitleClick={() => setEditorStep(4)} active={editorCurrentStep == 4} />
	<OpenGraphForm onTitleClick={() => setEditorStep(5)} active={editorCurrentStep == 5} />
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