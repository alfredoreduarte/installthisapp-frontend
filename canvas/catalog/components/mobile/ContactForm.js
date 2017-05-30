import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { push } from 'react-router-redux'
import Select from 'react-select'
import { Field, FieldArray, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { sendProductMessage } from 'canvas/catalog/actions/contacts'

let ContactForm = ({ 
	sent,
	fields,
	handleSubmit,
	requestFormSentTitle,
	requestFormSentHint,
	requestFormEmail,
	requestFormPhone,
	requestFormMessage,
	requestFormSubmit,
}) => (
	<form className="row" onSubmit={handleSubmit}>
		<div className={sent ? null : 'hide'}>
			<h1 className="ita-cali-form-sent-title">{requestFormSentTitle}</h1>
			<p className="ita-cali-form-sent-hint">{requestFormSentHint}</p>
		</div>
		<div className={sent ? 'hide' : null}>
			<div className="col-md-6">
				<div className="form-group">
					<label className="control-label ita-cali-form-label">* {requestFormEmail}</label>
					<Field
						name={'email'}
						type="email"
						required={true}
						className="form-control ita-cali-form-input" 
						component="input"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
						}}
					/>
				</div>
			</div>
			<div className="col-md-6">
				<div className="form-group">
					<label className="control-label ita-cali-form-label">{requestFormPhone}</label>
					<Field
						name={'phone'}
						type="text" 
						className="form-control ita-cali-form-input" 
						component="input"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
						}}
					/>
				</div>
			</div>
			<div className="col-md-12">
				<div className="form-group">
					<label className="control-label ita-cali-form-label">* {requestFormMessage}</label>
					<Field
						name={'content'}
						className="form-control ita-cali-form-input"
						rows="5"
						required={true}
						component="textarea"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
						}}
					/>
				</div>
			</div>
			<div className="col-md-12" style={{
				padding: '0px',
				display: 'flex',
				flexDirection: 'column',
			}}>
				<button type="submit" className="btn ita-cali-form-submit" style={{
					padding: '1em',
					margin: '.5em 1em',
					border: 'none',
					borderRadius: '.25em',
				}}>{requestFormSubmit}</button>
			</div>
		</div>
	</form>
)

const reduxFormName = 'catalogContact'

const validate = values => {
	const errors = {}
	if (!values.content) {
		errors.content = 'Required'
	} 
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	return errors
}

ContactForm = reduxForm({
	form: reduxFormName,
	validate,
})(ContactForm)

const selector = formValueSelector(reduxFormName)

const mapStateToProps = (state, ownProps) => {
	return {
		
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: e => { e.preventDefault(); dispatch(sendProductMessage(ownProps.productId)); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)