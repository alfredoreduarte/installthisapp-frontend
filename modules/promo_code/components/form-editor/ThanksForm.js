import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Kronos from 'react-kronos'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let ThanksForm = ({ active, selectedValues, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			"Thank You" screen
		</div>
		<div className="editor-tab-item-body">
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.showHeaderImageAtThanks'} component="input" type="checkbox" /> Include Header image
					</label>
				</div>
				<hr />
			</div>
			<div className="form-group">
				<label className="control-label">Title</label>
				<Field className="form-control" name={'messages.thanksTitle'} component="input" type="text" />
			</div>
			<div className="form-group">
				<label className="control-label">Paragraph</label>
				<Field className="form-control" name={'messages.thanksCopy'} component="textarea" />
			</div>
			<div className="form-group">
				<label className="control-label">Coupons label</label>
				<Field className="form-control" name={'messages.thanksCouponsAmountLabel'} component="textarea" />
			</div>
		</div>
	</div>
)

ThanksForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(ThanksForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ThanksForm)
