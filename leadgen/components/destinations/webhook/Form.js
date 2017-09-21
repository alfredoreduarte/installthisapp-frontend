import React from 'react'
import { Field, FieldArray } from 'redux-form'
import RenderHttpHeaders from 'leadgen/components/destinations/webhook/RenderHttpHeaders'
import FieldsDictionary from 'leadgen/components/destinations/webhook/FieldsDictionary'

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

const Form = () => 
<div>
	<div className="form-group">
		<label className="control-label">URL to POST</label>
		<Field
			name={'settings.url'}
			className="form-control"
			placeholder="https://yourwebsite.com/api/webhook"
			type="text"
			component="input" />
		<br/>
	</div>
	<p className="hide"><a href="#">Show Advanced Options</a></p>
	<div className="form-group">
		<label className="control-label">Payload Type</label>
		<Field name="settings.payloadType" component="select" className="form-control">
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
	<FieldArray name="settings.httpHeaders" component={RenderHttpHeaders} />
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