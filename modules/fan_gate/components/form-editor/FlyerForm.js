import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let FlyerForm = ({ active, selectedValues, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Flyer (exclusive for Fans)
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Image</label>
				<div className="col-sm-10">
					<Field name={'images.flyer'} recommendedDimensions="820x1000" component={ImageUploaderDropZone} />
					<p className="help-block">The image will act as a link to the URL you specify below, so you might want to include a button in your design.</p>
				</div>
			</div>
		</div>
		<div className="form-group">
			<label className="ontrol-label">Flyer link</label>
			<Field 
				className="form-control"
				name={'settings.flyerLinkUrl'} 
				component="input"
				type="text" 
				placeholder={'https://yourwebsite.com'} />
		</div>
	</div>
</div>

FlyerForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(FlyerForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		selectedValues: {
			welcomeLayout: selector(state, 'settings.welcomeLayout')
		},
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(FlyerForm)