import React from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/textmate'

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
		Paste any &lt;script&gt;, like your Google Analytics code.<br/>
		Everything you put here will be included in all pages of the app.
	</p>
</div>

let CssForm = ({ array, active, onTitleClick, defaultStyles }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Styles & Scripts (optional)
	</div>
	<div className="editor-tab-item-body">
		<Field name={'css'} component={renderCssField} defaultStyles={defaultStyles} label="CSS Code" />
		<Field name={'settings.javascript'} component={renderJsField} label="Custom Javascript" />
	</div>
</div>

CssForm = reduxForm({
	form: APP_EDITOR_FORM_NAME,  // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(CssForm)

// const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		defaultStyles: state.formEditorUI.defaultStylesheet,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(CssForm)