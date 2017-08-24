import React from 'react'
import { Field, FieldArray } from 'redux-form'
import RenderHttpHeaders from 'leadgen/components/RenderHttpHeaders'

const Form = () => 
<div>
	<div className="form-group">
		<label className="control-label">URL to POST</label>
		<Field
			name={'settings.url'}
			className="form-control"
			placeholder="https://yourwebsite.com/api/webhooks"
			type="text"
			component="input" />
		<br/>
	</div>
	<FieldArray name="settings.httpHeaders" component={RenderHttpHeaders} />
	<hr />
	<p>Request body example:</p>
	<pre>
		{JSON.stringify([
			{"name":"email","values":["test@fb.com"]},
			{"name":"full_name","values":["Example Name"]}
		])}
	</pre>
</div>

export default Form