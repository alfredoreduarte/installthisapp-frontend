import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let WelcomeForm = ({ active, selectedValues, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Welcome screen
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Header image</label>
				<div className="col-sm-10">
					<Field name={'images.welcome'} recommendedDimensions="820x250" component={ImageUploaderDropZone} />
				</div>
			</div>
		</div>
		<div className="form-group">
			<label className="col-sm-2 control-label">URL to like</label>
			<div className="col-sm-10">
				<Field 
					className="form-control"
					name={'settings.likeUrl'} 
					component="input"
					type="text" 
					placeholder={'https://www.facebook.com/InstallThisApp'} />
				<p className="help-block">This can be any URL, but if you want it to work with a Facebook Page, paste the page's URL with this format: https://www.facebook.com/InstallThisApp.</p>
			</div>
		</div>
	</div>
</div>

WelcomeForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(WelcomeForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeForm)