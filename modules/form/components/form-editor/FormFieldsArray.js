import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ClickOutside from 'react-click-outside'
import TagsInput from 'react-tagsinput'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { APP_EDITOR_FORM_NAME } from 'config'
import { setActiveEntryFormField } from 'actions/formEditorUI'
import MdClear from 'react-icons/lib/md/clear'
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down'
import MdArrowDropUp from 'react-icons/lib/md/arrow-drop-up'
import FaArrowsH from 'react-icons/lib/fa/arrows-h'

const OptionsDictionary = ({ input, label, type, meta: { touched, error } }) => 
<TagsInput 
	inputProps={{placeholder: 'Type in each choice and press enter.'}}
	className="editor-field-input editor-field-tag-input"
	value={input.value}
	addOnPaste={true}
	pasteSplit={data => {
		const separators = [',', ';', '\\(', '\\)', '\\*', '/', ':', '\\?', '\n', '\r']
		return data.split(new RegExp(separators.join('|'))).map(d => d.trim())
	}}
	renderTag={({ tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other }) =>
		<span key={key} {...other}>
			{getTagDisplayValue(tag)}
				{!disabled &&
				<a className={classNameRemove} onClick={(e) => onRemove(key)}>
					<MdClear size={16} style={{
						color: 'white',
						cursor: 'pointer',
					}} />
				</a>
			}
		</span>
	}
	onChange={ tags => input.onChange(tags) } />

const NiceFieldType = ({ type }) => <div className="editor-field-type">
	{type == 'email' && 'Email'}
	{type == 'shortText' && 'Short Text'}
	{type == 'longText' && 'Long Text'}
	{type == 'multipleChoice' && 'Multiple Choice'}
	{type == 'checkboxes' && 'Checkboxes'}
</div>

const FormFieldsArray = ({ activeFieldIndex, schemaFieldsForTypeConditions, changeIndex, fields, meta }) =>
<div>
	{fields.map((name, index) => {
		const este = schemaFieldsForTypeConditions[index]
		return  <div key={index} className="editor-field-wrapper">
			<ClickOutside
				onClickOutside={() => {
					changeIndex(null)
				}} onClick={() => {
					if (activeFieldIndex != index) {
						changeIndex(index)
					}
				}} className={`editor-field ${activeFieldIndex == index ? 'active' : ''}`}
			>
				<div className="editor-field-inactive">
					<div className="editor-field-name">{este.question}</div>
					<NiceFieldType type={este.type} />
				</div>
				<div className="editor-field-active">
					<div className="editor-field-header">
						<div className="editor-label">Question</div>
						<NiceFieldType type={este.type} />
					</div>
					<div className="editor-field-body">
						<Field
							name={`${name}.question`}
							type="text"
							component="input"
							className="form-control"
							placeholder="Question"
						/>
					</div>
					{este.options && <div className="editor-field-header">
						<div className="editor-label">Answers</div>
					</div>}
					{este.options && <div className="editor-field-body"><Field
						name={`${name}.options`}
						type="text"
						component={OptionsDictionary}
						className="form-control"
						placeholder="Question"
					/></div>}
					<div className="editor-field-footer">
						<div className="editor-field-mandatory-check">
							<label>
								<Field name={`${name}.required`} type="checkbox" component="input"/> This field is required
							</label>
						</div>
						<a className="editor-field-delete" onClick={() => fields.remove(index)}>Delete question</a>
					</div>
				</div>				
			</ClickOutside>
			<div className="editor-field-sorters">
				{index > 0 && <MdArrowDropUp className="editor-field-sorter" size={26} onClick={() => fields.move(index, index - 1)} />}
				{index + 1 < fields.length && <MdArrowDropDown  className="editor-field-sorter"size={26} onClick={() => fields.move(index, index + 1)} />}
			</div>
		</div>
	})}
</div>

const selector = formValueSelector(APP_EDITOR_FORM_NAME)

const mapStateToProps = (state, props) => {
	const schemaFieldsForTypeConditions = selector(state, 'schema')
	return {
		activeFieldIndex: state.formEditorUI.activeFieldIndex,
		schemaFieldsForTypeConditions,
	}
}

export default connect(mapStateToProps, dispatch => ({
	changeIndex: index => dispatch(setActiveEntryFormField(index))
}))(FormFieldsArray)