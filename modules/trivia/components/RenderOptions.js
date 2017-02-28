import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

// const selector = formValueSelector('triviaQuestionCreator')

const lower = value => {
	console.log('change')
	console.log(value)
	// return value
	if ( value == 'on' ) {
		return true
	} else {
		// return false
		return 'hola'
	}
}

const RareButton = (field) => (
	<div 
		// onClick={onToggle}
		// className={correct ? 'btn-outline btn-success' : 'btn-outline btn-default'}
		>
		the current value is {field.value}
	</div>
)

const RenderOptions = ({ fields, meta: { touched, error }, onOptionRemove }) => {
	return <ul className="list-unstyled">
		{touched && error && <span>{error}</span>}
		{fields.map((option, index) => {
			return <li key={index} className={option.correct == false && console.log(option) ? 'hide' : 'none'}>
				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button 
								// onClick={() => fields.remove(index)}
								className={'btn-danger btn-outline'}>
								<Field
									name={`${option}.correct`}
									// type="radio"
									// value="correct"
									// value={true}
									// checked={option.correct}
									// className="form-control"
									// component="input"
									component={RareButton}
									normalize={lower}
									// label="Correct"
									/>
							</Button>
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
								onClick={() => {
									// const field = {...fields[index]}
									// fields.remove(index)
									// fields.insert(index, {
										// ...field,
										// _destroy: true
									// })
									onOptionRemove(`${option}._destroy`, true)
								}}
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