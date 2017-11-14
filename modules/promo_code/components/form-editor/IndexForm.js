import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Kronos from 'react-kronos'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let IndexForm = ({ active, selectedValues, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			Main screen
		</div>
		<div className="editor-tab-item-body">
			<div className="form-group">
				<label className="control-label">Title</label>
				<Field className="form-control" name={'messages.indexTitle'} component="input" type="text" />
			</div>
			<div className="form-group">
				<label className="control-label">Paragraph</label>
				<Field className="form-control" name={'messages.indexCopy'} component="textarea" />
			</div>
			<div className="form-group">
				<label className="control-label">Code field label</label>
				<Field className="form-control" name={'messages.codeFormLabel'} component="input" type="text" />
			</div>
			<div className="form-group">
				<label className="control-label">Submit button</label>
				<Field className="form-control" name={'messages.codeFormButtonLabel'} component="input" type="text" />
			</div>
		</div>
	</div>
)

IndexForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(IndexForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(IndexForm)
