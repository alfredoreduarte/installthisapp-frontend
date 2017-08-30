import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'


const RenderHttpHeaders = ({ fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	<p 
		className="control-label"><b>HTTP Headers</b> <span className="text-muted">Optional</span>
		<a 
		className="pull-right" 
		style={{textDecoration: 'underline', cursor: 'pointer'}} 
		onClick={() => fields.push({})}>Add HTTP Header</a></p>
		{submitFailed &&
			error &&
			<p className="text-danger">{error}</p>}
	<div>
		{fields.map((header, index) =>
			<div key={index} style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
			}}>
				<Field
					name={`${header}.key`}
					type="text"
					component="input"
					className="form-control"
					placeholder="Key"
				/>
			
				<Field
					name={`${header}.value`}
					type="text"
					className="form-control"
					component="input"
					placeholder="Value"
				/>
				<FaClose onClick={() => fields.remove(index)} size="22" style={{margin: '0px 10px', cursor: 'pointer'}} />
			</div>
		)}
	</div>
</div>

export default RenderHttpHeaders