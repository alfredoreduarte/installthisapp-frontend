import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Image from 'canvas/form/components/Image'

const Form = ({ image, schema, fields }) => (
	<div className="col-sm-4 col-md-offset-4">
		<form>
			{schema.map(field => {
				if (field.type == 'shortText') {
					return (
						<div key={field.id} className="form-group">
							<label>{field.question}</label>
							<Field 
								className="form-control"
								name={field.question}
								component={'input'} 
								type={'text'} />
						</div>
					)
				}
				if (field.type == 'multipleChoice') {
					return (
						<div key={field.id} className="form-group">
							<label>{field.question}</label>
							{field.options.map(option =>
								<div key={field.id + option} className="radio">
									<label><Field name={field.question} component="input" type="radio" value={option} /> {option}</label>
								</div>
							)}
						</div>
					)
				}
				if (field.type == 'longText') {
					return (
						<div key={field.id} className="form-group">
							<label>{field.question}</label>
							<Field 
								className="form-control"
								name={field.question} 
								component={'textarea'} />
						</div>
					)
				}
			})}
			<div className="form-group">
				<button type="submit" className="btn btn-primary btn-block">Send</button>
			</div>
		</form>
	</div>
)

Form.propTypes = {
	// image: PropTypes.string.isRequired,
}

export default Form