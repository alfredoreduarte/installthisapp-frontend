import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Form = ({ messages, schema, handleSubmit }) => (
	<div className="col-sm-4 col-md-offset-4">
		<h1>{messages.formHeading}</h1>
		<form onSubmit={handleSubmit}>
			{schema.map(field => 
				<div key={field.id}>
					{field.type == 'shortText' &&
						<div className="form-group">
							<label>{field.question}</label>
							<Field 
								className="form-control"
								name={field.id}
								required={field.required}
								component={'input'} 
								type={'text'} />
						</div>}
					{field.type == 'email' &&
						<div className="form-group">
							<label>{field.question}</label>
							<Field 
								className="form-control"
								name={field.id}
								required={field.required}
								component={'input'} 
								type={'email'} />
						</div>}
					{field.type == 'multipleChoice' &&
						<div className="form-group">
							<label>{field.question}</label>
							{field.options.map(option =>
								<div key={field.id + option} className="radio">
									<label>
										<Field 
											name={field.id} 
											required={field.required} 
											component="input" 
											type="radio" 
											value={option} /> {option}
									</label>
								</div>
							)}
						</div>
					}
					{field.type == 'longText' &&
						<div className="form-group">
							<label>{field.question}</label>
							<Field 
								className="form-control"
								required={field.required}
								name={field.id}
								component={'textarea'} />
						</div>
					}
				</div>
			)}
			<div className="form-group">
				<button type="submit" className="btn btn-primary btn-block">{messages.submitButton}</button>
			</div>
		</form>
		<p className="text-center">
			<a href={messages.privacyPolicyUrl} target="_blank">
				{messages.privacyPolicyLinkText}
			</a>
		</p>
	</div>
)

Form.propTypes = {
	
}

export default Form