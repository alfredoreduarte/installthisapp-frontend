import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import MdClose from 'react-icons/lib/md/close'
import FaArrowsH from 'react-icons/lib/fa/arrows-h'

const OptionsDictionary = ({ fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	{fields.map((field, index) =>
		<div key={index}>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
			}}>
				<Field
					name={field}
					type="text"
					component="input"
					className="form-control"
					placeholder="Question"
				/>
				<MdClose 
					size="62" 
					className="text-danger" 
					onClick={() => fields.remove(index)} style={{margin: '0px 10px', cursor: 'pointer'}} />
			</div>
		</div>
	)}
	{fields != undefined && <p>
		<a className="btn btn-success btn-outline btn-block" onClick={() => fields.push('opcion')}>Add option</a>
	</p>}
</div>

const FieldsDictionary = ({ schemaFieldsForTypeConditions, fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	<p>What information would you like to ask for?</p>
	{submitFailed && error && <p className="text-danger">{error}</p>}
	{fields.map((field, index) =>{
		const este = schemaFieldsForTypeConditions[index]
		return (
			<div key={index}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
					<Field
						name={`${field}.question`}
						type="text"
						component="input"
						className="form-control"
						placeholder="Question"
					/>
					<MdClose 
						size="62" 
						className="text-danger" 
						onClick={() => fields.remove(index)} style={{margin: '0px 10px', cursor: 'pointer'}} />
				</div>
				{este.options && <FieldArray name={`${field}.options`} component={OptionsDictionary} />}
			</div>
		)
	})}
</div>

const selector = formValueSelector('formEditor')

const mapStateToProps = (state, props) => {
	const schemaFieldsForTypeConditions = selector(state, 'schema')
	return {
		schemaFieldsForTypeConditions,
	}
}

export default connect(mapStateToProps)(FieldsDictionary)