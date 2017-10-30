import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let UploadScreenForm = ({ active, vouchersCreatorPath, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			Upload Screen
		</div>
		<div className="editor-tab-item-body">
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.showHeaderImageAtUploadScreen'} component="input" type="checkbox" /> Include Header image
					</label>
				</div>
				<hr />
			</div>
			<div className="form-group">
				<label className="control-label">Photo Field label</label>
				<Field className="form-control" name={'messages.photoFieldLabel'} component="input" type="text" placeholder={'Photo'} />
			</div>
			<div className="form-group">
				<label className="control-label">Caption Field label</label>
				<Field
					className="form-control"
					name={'messages.captionFieldLabel'}
					component="input"
					type="text"
					placeholder={'Caption'}
				/>
			</div>
			<div className="form-group">
				<label className="control-label">Back button label</label>
				<Field className="form-control" name={'messages.backButtonLabel'} component="input" type="text" placeholder={'Back'} />
			</div>
			<div className="form-group">
				<label className="control-label">Submit button label</label>
				<Field
					className="form-control"
					name={'messages.submitButtonLabel'}
					component="input"
					type="text"
					placeholder={'Submit'}
				/>
			</div>
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.showFooterImageAtUploadScreen'} component="input" type="checkbox" /> Include Footer image
					</label>
				</div>
			</div>
		</div>
	</div>
)

UploadScreenForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(UploadScreenForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	// const currentApp = getCurrentAppByState(state)
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreenForm)
