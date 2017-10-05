import React from 'react'
import v4 from 'node-uuid'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, Field, FieldArray } from 'redux-form'
import TagsInput from 'react-tagsinput'
import FormFieldsArray from 'components/form-editor/FormFieldsArray'

let EntryForm = ({ array, active }) => 
<div className={`editor-tab-item ${active && 'active'}`}>
	<div className="editor-tab-item-title">
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
					index: 0,
					question: 'Question',
					id: v4(),
					type: 'shortText',
				})}>Short text</a>
				<a className="btn btn-sm btn-success btn-outline" onClick={() => array.push('schema', {
					index: 0,
					question: 'Question',
					id: v4(),
					type: 'longText',
				})}>Long text field</a>
				<a className="btn btn-sm btn-danger btn-outline" onClick={() => array.push('schema', {
					index: 0,
					question: 'Question',
					id: v4(),
					type: 'email',
				})}>Email</a>
				<a className="btn btn-sm btn-warning btn-outline" onClick={() => array.push('schema', {
					index: 0,
					question: 'Question',
					id: v4(),
					type: 'multipleChoice',
					options: [],
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
			<div className="hide">
				<div className="editor-field">
					<div className="editor-field-inactive">
						<div className="editor-field-name">Color Favorito</div>
						<div className="editor-field-type">Multiple Choice</div>
					</div>
				</div>
				<div className="editor-field">
					<div className="editor-field-inactive">
						<div className="editor-field-name">Nombre de tu perro</div>
						<div className="editor-field-type">Short answer</div>
					</div>
				</div>
				<div className="editor-field active">
					<div className="editor-field-inactive">
						<div className="editor-field-name">Dirección</div>
						<div className="editor-field-type">Short answer</div>
					</div>
					<div className="editor-field-active">
						<div className="editor-field-header">
							<div className="editor-label">Question</div>
							<div className="editor-field-type">Short answer</div>
						</div>
						<div className="editor-field-body">
							<input className="editor-field-input" defaultValue="Dirección" />
						</div>
						<div className="editor-field-footer">
							<div className="editor-field-mandatory-check">
								<label>
									<input type="checkbox" /> This field is required
								</label>
							</div>
							<a href="#" className="editor-field-delete">Delete question</a>
						</div>
					</div>
				</div>
				<div className="editor-field active">
					<div className="editor-field-inactive">
						<div className="editor-field-name">Dirección</div>
						<div className="editor-field-type">Short answer</div>
					</div>
					<div className="editor-field-active">
						<div className="editor-field-header">
							<div className="editor-label">Question</div>
							<div className="editor-field-type">Multiple choice</div>
						</div>
						<div className="editor-field-body">
							<input className="editor-field-input" defaultValue="Dirección" />
						</div>
						<div className="editor-field-header">
							<div className="editor-label">Answers</div>
						</div>
						<div className="editor-field-body">
							<TagsInput 
								inputProps={{placeholder: 'Type in each choice and press enter.'}}
								className="editor-field-input editor-field-tag-input" 
								value={[
									'hola', 
									'chau', 
									'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.', 
									'Nullam quis risus eget urna mollis ornare vel eu leo.'
								]}
								onChange={tags => {console.log(tags)}} />
						</div>
						<div className="editor-field-footer">
							<div></div>
							<a href="#" className="editor-field-delete">Delete question</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

EntryForm = reduxForm({
	form: 'formEditor',              // <------ same form name
	destroyOnUnmount: false,     // <------ preserve form data
})(EntryForm)

// const selector = formValueSelector('formEditor')

const mapStateToProps = (state, props) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)