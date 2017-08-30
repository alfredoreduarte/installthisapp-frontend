import React from 'react'
import { Field } from 'redux-form'

const Form = () => 
<div>
	<div className="form-group">
		<label className="control-label">Comma-separated Email recipients</label>
		<Field
			name={'settings.recipients'}
			className="form-control" 
			rows={3}
			component="textarea" />
	</div>
</div>

export default Form