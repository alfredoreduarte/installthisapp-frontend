import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let CaptchaForm = ({ active, selectedValues, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			Captcha screen
		</div>
		<div className="editor-tab-item-body">
			<div className="form-group">
				<label className="control-label">Captcha Question</label>
				<Field
					className="form-control"
					name={'messages.captchaQuestion'}
					component="input"
					type="text"
					placeholder={'Welcome to our form'}
				/>
			</div>
			<div className="form-group text-center">
				<label className="control-label">Correct Answer</label>
				<Field name={'images.captcha.correct'} recommendedDimensions="400x400" component={ImageUploaderDropZone} />
			</div>
			<label className="control-label text-center">Incorrect Answers</label>
			<div className="form-group">
				<div className="col-xs-6">
					<Field name={'images.captcha.incorrect[0]'} recommendedDimensions="400x400" component={ImageUploaderDropZone} />
				</div>
				<div className="col-xs-6">
					<Field name={'images.captcha.incorrect[1]'} recommendedDimensions="400x400" component={ImageUploaderDropZone} />
				</div>
			</div>
		</div>
	</div>
)

CaptchaForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(CaptchaForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaForm)
