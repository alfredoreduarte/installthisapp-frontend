import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'

let ContactForm = ({ 
	fetching,
	fields,
	handleSubmit,
}) => (
	<div className="row">
		<div className="col-md-6">
			<div className="form-group">
				<label className="control-label">Email</label>
				<Field
					name={'email'}
					type="email" 
					className="form-control" 
					component="input"
				/>
			</div>
		</div>
		<div className="col-md-6">
			<div className="form-group">
				<label className="control-label">Phone</label>
				<Field
					name={'phone'}
					type="text" 
					className="form-control" 
					component="input"
				/>
			</div>
		</div>
		<div className="col-md-12">
			<div className="form-group">
				<label className="control-label">Message</label>
				<Field
					name={'message'}
					className="form-control"
					rows="5"
					component="textarea"
				/>
			</div>
		</div>
		<div className="col-md-12">
			<button type="submit" className="btn btn-primary btn-lg btn-block">Send</button>
		</div>
	</div>
)

const reduxFormName = 'catalogContact'

ContactForm = reduxForm({
	form: reduxFormName,
})(ContactForm)

const selector = formValueSelector(reduxFormName)

const mapStateToProps = (state, ownProps) => {
	return {
		
	}
}

export default connect(mapStateToProps)(ContactForm)