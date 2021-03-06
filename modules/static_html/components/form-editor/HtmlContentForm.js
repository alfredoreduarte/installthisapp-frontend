import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/textmate'
import { getCurrentAppByState } from 'selectors/apps'
import EditorContainer from 'containers/EditorContainer'
import ImageUploaderDropZone from 'components/form-editor/ImageUploaderDropZone'

const renderHtmlField = ({ input: { value, onChange }, label, type, meta: { touched, error, warning } }) => 
<div className="form-group">
	<label className="control-label">{label}</label>
	<AceEditor
		mode={"html"}
		theme="textmate"
		value={value} onChange={onChange}
		name="UNIQUE_ID_OF_DIV_3"
		width={'100%'}
		height={'200px'}
		showGutter={true}
		showLineNumbers={false}
		editorProps={{
			$blockScrolling: true,
		}}
	/>
	<br/>
	<p className="help-block">
		Avoid putting any Javascript here won't work.<br/>
		Put your custom scripts in the dedicated field at the bottom.
	</p>
</div>

const renderCssField = ({ input: { value, onChange }, label, type, meta: { touched, error, warning }, defaultStyles }) => 
<div className="form-group">
	<label className="control-label">{label}</label>
	<AceEditor
		mode={"css"}
		theme="textmate"
		value={value} onChange={onChange}
		name="UNIQUE_ID_OF_DIV"
		width={'100%'}
		height={'200px'}
		showGutter={true}
		showLineNumbers={false}
		editorProps={{
			$blockScrolling: true,
		}}
	/>
	<br/>
	{defaultStyles && <p className="text-right">
		<span className="btn btn-danger btn-outline btn-xs" onClick={() => onChange(defaultStyles)}>Restore original style</span>
	</p>}
</div>

const renderJsField = ({ input: { value, onChange }, label, type, meta: { touched, error, warning } }) => 
<div className="form-group">
	<label className="control-label">{label}</label>
	<AceEditor
		mode={"html"}
		theme="textmate"
		value={value} onChange={onChange}
		name="UNIQUE_ID_OF_DIV_2"
		width={'100%'}
		height={'200px'}
		showGutter={true}
		showLineNumbers={false}
		editorProps={{
			$blockScrolling: true,
		}}
	/>
	<br/>
	<p className="help-block">
		Wrap everything in &lt;script&gt;&lt;/script&gt; tags. Do not write raw Javascript code.
	</p>
</div>

let HtmlContentForm = ({ active, onTitleClick, selectedValues, defaultStyles }) => 
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
			<div>
				<Field name={'settings.htmlContent'} component={renderHtmlField} label="HTML Code" />
				<hr/>
				<Field name={'css'} component={renderCssField} defaultStyles={defaultStyles} label="CSS Code" />
				<hr/>
				<Field name={'settings.javascript'} component={renderJsField} label="Custom Javascript" />
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
	selectedValues: selector(state, 'settings'),
	defaultStyles: state.formEditorUI.defaultStylesheet,
})

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(HtmlContentForm)