import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let SinglePhotoForm = ({ active, vouchersCreatorPath, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			Single Photo
		</div>
		<div className="editor-tab-item-body">
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.showHeaderImageAtSinglePhotoScreen'} component="input" type="checkbox" /> Include Header
						image
					</label>
				</div>
				<hr />
			</div>
			<div className="form-group">
				<label className="control-label">Votes label</label>
				<Field className="form-control" name={'messages.votesLabel'} component="input" type="text" placeholder={'Votes'} />
			</div>
			<div className="form-group">
				<label className="control-label">Vote button</label>
				<Field className="form-control" name={'messages.voteButtonLabel'} component="input" type="text" placeholder={'Vote'} />
			</div>
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.showFooterImageAtSinglePhotoScreen'} component="input" type="checkbox" /> Include Footer
						image
					</label>
				</div>
			</div>
		</div>
	</div>
)

SinglePhotoForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(SinglePhotoForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	// const currentApp = getCurrentAppByState(state)
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePhotoForm)
