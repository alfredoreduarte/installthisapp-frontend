import React from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field, FieldArray } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import FormFieldsArray from 'modules/form/components/form-editor/FormFieldsArray'

let EntryForm = ({ array, active, onTitleClick }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title" onClick={onTitleClick}>
		Entry Form
	</div>
	<div className="editor-tab-item-body">
		<div className="form-horizontal">
			<div className="form-group">
				<label className="col-sm-2 control-label">Headline</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.formHeading'} 
						component="input"
						type="text" 
						placeholder={'Welcome to our form'} />
				</div>
			</div>
			<hr />
			<h5 className="text-center">What information would you like to ask for?</h5>
			<div className="editor-form-button-rack">
				<a className="btn btn-sm btn-primary btn-outline" onClick={() => array.push('schema', {
					question: 'Question text',
					id: v4(),
					type: 'shortText',
				})}>Short text</a>
				<a className="btn btn-sm btn-success btn-outline" onClick={() => array.push('schema', {
					question: 'Question text',
					id: v4(),
					type: 'longText',
				})}>Long text field</a>
				<a className="btn btn-sm btn-danger btn-outline" onClick={() => array.push('schema', {
					question: 'Question text',
					id: v4(),
					type: 'email',
				})}>Email</a>
				<a className="btn btn-sm btn-warning btn-outline" onClick={() => array.push('schema', {
					question: 'Question text',
					id: v4(),
					type: 'multipleChoice',
					options: ['First option'],
				})}>Multiple choice</a>
			</div>
			<FieldArray name="schema" component={FormFieldsArray} />
			<hr />
			<div className="form-group">
				<label className="col-sm-2 control-label">Button</label>
				<div className="col-sm-10">
					<Field 
						className="form-control"
						name={'messages.submitButton'} 
						component="input"
						type="text" 
						placeholder={'Send'} />
				</div>
			</div>
		</div>
	</div>
</div>

EntryForm = reduxForm({
	form: APP_EDITOR_FORM_NAME,  // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(EntryForm)

// const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)