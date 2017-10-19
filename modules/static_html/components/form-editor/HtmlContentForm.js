import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

let HtmlContentForm = ({ active, onTitleClick, selectedValues }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		HTML content
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Layout</label>
				<div className="col-sm-10">
					<Field name="settings.contentMode" component="select" className="form-control">
						<option value={'html'}>HTML</option>
						<option value={'iframe'}>Iframe URL</option>
					</Field>
				</div>
			</div>
			<hr />
		</div>
		{selectedValues.contentMode == 'iframe' &&
			<div className="form-group">
				<label className="control-label">Paste the URL for the iframe</label>
				<Field 
					className="form-control"
					name={'settings.iframeUrl'} 
					component="input"
					type="text" 
					placeholder={'https://yourwebsite.com'} />
				<p className="help-block">SSL (https) is required for this to work inside Facebook Page tabs</p>
			</div>
		}
		{selectedValues.contentMode == 'html' &&
			<div className="form-group">
				<label className="control-label">Paste your HTML here</label>
				<Field 
					className="form-control"
					name={'settings.htmlContent'} 
					component="textarea"
					rows="10"
					placeholder={'<html>'} />
			</div>
		}
	</div>
</div>

HtmlContentForm = reduxForm({
	form: APP_EDITOR_FORM_NAME, 		// <------ same form name
	destroyOnUnmount: false, 	// <------ preserve form data
})(HtmlContentForm)

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => ({
	selectedValues: selector(state, 'settings')
})

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(HtmlContentForm)