import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import MdClose from 'react-icons/lib/md/close'
import FaArrowsH from 'react-icons/lib/fa/arrows-h'


const FieldsDictionary = ({ originalLabels, fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	<p className="control-label"><b>Data</b> <small className="text-muted">Optional</small>
	<a 
	className="pull-right" 
	style={{textDecoration: 'underline', cursor: 'pointer'}} 
	onClick={() => fields.push({})}>Add Field</a></p>
	<p className="control-label">
		Use this to assign custom names to the default fields sent by Facebook.
		If you leave this empty, it will default to including the raw data 
		from the Facebook form.
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
				<MdClose size="62" className="text-danger" onClick={() => fields.remove(index)} style={{margin: '0px 10px', cursor: 'pointer'}} />
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