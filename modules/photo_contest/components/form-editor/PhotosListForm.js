import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let PhotosListForm = ({ active, vouchersCreatorPath, onTitleClick }) => (
	<div className={`editor-tab-item ${active && 'active'}`}>
		<div className="editor-tab-item-title" onClick={onTitleClick}>
			Photos List
		</div>
		<div className="editor-tab-item-body">
			<div className="form-group">
				<label className="col-sm-2 control-label">Header image</label>
				<div className="col-sm-10">
					<Field name={'images.header'} recommendedDimensions="820x250" component={ImageUploaderDropZone} />
				</div>
			</div>
			<div className="form-group">
				<label className="control-label">Participate button label</label>
				<Field
					className="form-control"
					name={'messages.uploadButtonLabel'}
					component="input"
					type="text"
					placeholder={'Participate'}
				/>
			</div>
			<div className="form-group hide">
				<label className="control-label">Load more button label</label>
				<Field
					className="form-control"
					name={'messages.loadMoreButtonLabel'}
					component="input"
					type="text"
					placeholder={'Load More'}
				/>
			</div>
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.multipleVotesPerUser'} component="input" type="checkbox" /> Allow voting for multiple
						photos
					</label>
				</div>
			</div>
			<div className="form-horizontal">
				<div className="checkbox">
					<label>
						<Field name={'settings.multiplePhotosPerUser'} component="input" type="checkbox" /> Allow multiple photos per
						user
					</label>
				</div>
				<hr />
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Footer image</label>
				<div className="col-sm-10">
					<Field name={'images.footer'} recommendedDimensions="820x250" component={ImageUploaderDropZone} />
				</div>
			</div>
		</div>
	</div>
)

PhotosListForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
})(PhotosListForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosListForm)
