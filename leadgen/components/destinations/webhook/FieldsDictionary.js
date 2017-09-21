import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'
import FaArrowsH from 'react-icons/lib/fa/arrows-h'


const FieldsDictionary = ({ originalLabels, fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	<p className="control-label"><b>Data</b> <small className="text-muted">Optional</small>
	<a 
	className="pull-right" 
	style={{textDecoration: 'underline', cursor: 'pointer'}} 
	onClick={() => fields.push({})}>Add Field</a></p>
	<p className="control-label">
		If you leave this empty, it will default to including the raw data 
		from the previous step. Key, value pairs sent as data. 
		Do not place raw JSON or form encoded values here!
	</p>
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
					placeholder="Custom name"
				/>
				<FaArrowsH size="46" className="text-muted" style={{margin: '0px 10px'}} />
				<Field name={`${header}.value`} component="select" className="form-control">
					<option value={''} disabled>-- Select a field --</option>
					{originalLabels.map(originalLabel => 
						<option 
							key={originalLabel.name} 
							value={originalLabel.name}>{originalLabel.name}</option>
					)}
				</Field>
				<div onClick={() => fields.remove(index)} className="btn btn-danger btn-xs" style={{margin: '0px 10px'}}>
					<FaClose size="12" />
				</div>
			</div>
		)}
	</div>
</div>

const mapStateToProps = (state, props) => {
	return {
		originalLabels: state.leadgenUI.sourceTestLeadData,
	}
}

export default connect(mapStateToProps)(FieldsDictionary)