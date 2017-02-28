import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

const RareButton = (field) => (
	<Button 
		onClick={() => field.input.onChange(!field.input.value)}
		className={field.input.value ? 'btn-outline btn-success' : 'btn-outline btn-danger'}
		>
		{field.input.value ? 'Correct answer' : 'Wrong answer'}
	</Button>
)

const RenderOptions = ({ fields, meta: { touched, error }, onOptionRemove }) => {
	return <ul className="list-unstyled">
		{touched && error && <span>{error}</span>}
		{fields.map((option, index) => {
			return <li key={index} className={option.correct == false && console.log(option) ? 'hide' : 'none'}>
				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Field
								name={`${option}.correct`}
								component={RareButton}
								/>
						</InputGroup.Button>
						<Field 
							name={`${option}.text`}
							type="text"
							className="form-control"
							component="input"
							label="Text"
						 />
						<InputGroup.Button>
							<Button 
								onClick={() => onOptionRemove(`${option}._destroy`, true)}
								className={'btn-danger btn-outline'}>
								<Glyphicon glyph="trash" />
							</Button>
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</li>
		}
		)}
		<li>
			<button className="btn btn-xs btn-primary btn-outline" onClick={() => fields.push({
				id: null,
				text: 'New option',
				correct: false,
				_destroy: false,
			})}>Add Option</button>
		</li>
	</ul>
}

export default RenderOptions