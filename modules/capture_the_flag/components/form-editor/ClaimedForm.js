import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let ClaimedForm = ({ active, selectedValues, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			"You have the flag" screen
		</div>
		<div className="editor-tab-item-body">
			<div className="form-group">
				<label className="control-label">Screen Title</label>
				<Field
					className="form-control"
					name={'messages.claimedScreenTitle'}
					component="input"
					type="text"
					placeholder={'Start now'}
				/>
			</div>
		</div>
	</div>
)

ClaimedForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(ClaimedForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ClaimedForm)
