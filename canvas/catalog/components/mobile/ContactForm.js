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
}) => (
	<form className="row" onSubmit={handleSubmit}>
		<div className={sent ? null : 'hide'}>
			<h1 style={{
				// design
				lineHeight: 1.5,
				textAlign: 'center',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '14px',
				fontFamily: 'Montserrat',
				fontWeight: 'bold',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>Message sent</h1>
			<p style={{
				// design
				lineHeight: 1.5,
				textAlign: 'center',
				color: '#5A6471',
				letterSpacing: '0px',
				fontSize: '12px',
				fontFamily: 'Montserrat',
				fontWeight: '300',
				fontStyle: 'normal',
				textDecoration: 'none',
				textTransform: 'none',
			}}>Thanks! We'll review your message and reply as soon as possible.</p>
		</div>
		<div className={sent ? 'hide' : null}>
			<div className="col-md-6">
				<div className="form-group">
					<label className="control-label" style={{
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '11px',
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'uppercase',
					}}>* {'Email'}</label>
					<Field
						name={'email'}
						type="email"
						required={true}
						className="form-control" 
						component="input"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#5A6471',
							borderColor: '#E1E1E1',
							backgroundColor: '#F5F5F5',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: 'normal',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}
					/>
				</div>
			</div>
			<div className="col-md-6">
				<div className="form-group">
					<label className="control-label" style={{
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '11px',
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'uppercase',
					}}>{'Phone'}</label>
					<Field
						name={'phone'}
						type="text" 
						className="form-control" 
						component="input"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#5A6471',
							borderColor: '#E1E1E1',
							backgroundColor: '#F5F5F5',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: 'normal',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}
					/>
				</div>
			</div>
			<div className="col-md-12">
				<div className="form-group">
					<label className="control-label" style={{
						// design
						lineHeight: 1.5,
						textAlign: 'left',
						color: '#5A6471',
						letterSpacing: '0px',
						fontSize: '11px',
						fontFamily: 'Montserrat',
						fontWeight: 'bold',
						fontStyle: 'normal',
						textDecoration: 'none',
						textTransform: 'uppercase',
					}}>* {'Message'}</label>
					<Field
						name={'content'}
						className="form-control"
						rows="5"
						required={true}
						component="textarea"
						style={{
							boxShadow: 'none',
							borderRadius: '.25em',
							// design
							lineHeight: 1.5,
							textAlign: 'left',
							color: '#5A6471',
							borderColor: '#E1E1E1',
							backgroundColor: '#F5F5F5',
							letterSpacing: '0px',
							fontSize: '12px',
							fontFamily: 'Montserrat',
							fontWeight: 'normal',
							fontStyle: 'normal',
							textDecoration: 'none',
							textTransform: 'none',
						}}
					/>
				</div>
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
			}}>
				<button type="submit" className="btn" style={{
					padding: '1em',
					margin: '.5em 1em',
					border: 'none',
					borderRadius: '.25em',
					// design
					lineHeight: 1.5,
					textAlign: 'center',
					color: '#ffffff',
					backgroundColor: '#6A588B',
					letterSpacing: '0px',
					fontSize: '18px',
					fontFamily: 'Montserrat',
					fontWeight: 'normal',
					fontStyle: 'normal',
					textDecoration: 'none',
					textTransform: 'uppercase',
				}}>Send Request</button>
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