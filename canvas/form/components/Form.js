import React, { PropTypes } from 'react'
import { Field } from 'redux-form'

import Image from 'canvas/form/components/Image'

const Form = ({ messages, images, settings, schema, handleSubmit }) => 
<div>
	{settings.showHeaderImageAtForm && <Image source={images.header} />}
	<div className="container">
		<div className="col-sm-12">
			<div className="row">
				<div className="col-sm-6">
					<h1>{messages.formHeading}</h1>
				</div>
				<div className="col-sm-6" style={{marginTop: '42px'}}>
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
								{field.type == 'checkboxes' &&
									<div className="form-group">
										<label>{field.question}</label>
										{field.options.map(option =>
											<div key={field.id + option} className="checkbox">
												<label>
													<Field 
														name={`${field.id}[${option}]`}
														component="input"
														type="checkbox"
														value={option}
													/> {option}
												</label>
											</div>
										)}
									</div>
								}
							</div>
						)}
						<div className="form-group">
							<button type="submit" className="btn btn-primary  btn-lg">{messages.submitButton}</button>
						</div>
					</form>
					<p className="text-center">
						<a href={settings.privacyPolicyUrl} target="_blank">
							{messages.privacyPolicyLinkText}
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

Form.propTypes = {
	
}

export default Form