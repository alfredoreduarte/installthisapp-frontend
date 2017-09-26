import React from 'react'
import { Field, FieldArray } from 'redux-form'
import RenderHttpHeaders from 'leadgen/components/destinations/webhook/RenderHttpHeaders'
import FieldsDictionary from 'leadgen/components/destinations/webhook/FieldsDictionary'
import FixedValues from 'leadgen/components/destinations/webhook/FixedValues'

const payloadTypes = [
	{
		value: 'form',
		label: 'Form',
	},
	{
		value: 'json',
		label: 'JSON',
	},
	{
		value: 'xml',
		label: 'XML',
	},
]

const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
<div className={`form-group ${touched && ((error && 'has-error') || (warning && 'has-warning'))}`}>
	<label className="control-label">{label}</label>
	<input
		{...input}
		className="form-control"
		placeholder={placeholder}
		type={type}
		required={true} />
	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
	<br/>
</div>
)

const Form = () => 
<div>
	<Field
		name={'settings.url'}
		placeholder="https://yourwebsite.com/api/webhook"
		type="text"
		required={true}
		component={renderField}
		label="URL to POST" />
	<div className="form-group">
		<label className="control-label">Payload Type</label>
		<Field name="settings.payloadType" component="select" className="form-control" required={true}>
			<option value={''} disabled>-- Select a type --</option>
			{payloadTypes.map(payloadType => 
				<option 
					key={payloadType.value} 
					value={payloadType.value}>{payloadType.label}</option>
			)}
		</Field>
	</div>
	<hr />
	<FieldArray name="settings.fieldsDictionary" component={FieldsDictionary} />
	<hr />
	<FieldArray name="settings.fixedValues" component={FixedValues} />
	<hr />
	<FieldArray name="settings.httpHeaders" component={RenderHttpHeaders} />
	<hr />
	<p className="control-label"><b>IP addresses to whitelist:</b></p>
	<p><small className="text-muted">Add these in case your server blocks incoming requests</small></p>
	<ul className="list-unstyled">
		<li>54.173.229.200</li>
		<li>54.175.230.252</li>
	</ul>
	<hr />
	<div className="hide">
		<p>Request body example:</p>
		<pre>
			{JSON.stringify([
				{"name":"email","values":["test@fb.com"]},
				{"name":"full_name","values":["Example Name"]}
			])}
		</pre>
	</div>
</div>

export default Form