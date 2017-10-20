import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let OpenGraphForm = ({ active, selectedValues, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Social sharing
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<p className="text-center"><b>This will show up when you share the app's URL on Facebook</b></p>
			<hr/>
			<div className="form-group">
				<label className="col-sm-2 control-label">Title</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'settings.openGraphTitle'} 
						component="input"
						type="text" 
						placeholder={'Title for posts shared on Facebook'} />
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Description</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'settings.openGraphDescription'} 
						component="input"
						type="text" 
						placeholder={'Title for posts shared on Facebook'} />
					<p className="help-block">Usually between 2 and 4 sentences.</p>
				</div>
			</div>
			<div className="form-group">
				<label className="col-sm-2 control-label">Thumbnail</label>
				<div className="col-sm-10">
					<Field name={'settings.openGraphImage'} recommendedDimensions="600 x 315" component={ImageUploaderDropZone} />
					<p className="help-block">
						Use images that are at least 1200 x 630 pixels for the best display on high resolution devices.<br/>
						At the minimum, you should use images that are 600 x 315 pixels to display link page posts with larger images.<br/>
						<a href="https://developers.facebook.com/docs/sharing/best-practices#images" target="_blank">View Facebook's guide</a>.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

OpenGraphForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(OpenGraphForm)

// const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenGraphForm)