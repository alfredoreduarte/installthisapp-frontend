import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import MdClose from 'react-icons/lib/md/close'
import FaArrowsH from 'react-icons/lib/fa/arrows-h'

const FixedValues = ({ originalLabels, fields, meta: { error, submitFailed } }) =>
<div className="form-group">
	<p className="control-label"><b>Fixed values</b> <small className="text-muted">Optional</small>
	<a 
	className="pull-right" 
	style={{textDecoration: 'underline', cursor: 'pointer'}} 
	onClick={() => fields.push({})}>Add Value</a></p>
	<p className="control-label">
		Use this to include fixed values to all leads,
		like UTM fields for conversion tracking.
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
					placeholder="Key"
				/>
				<FaArrowsH size="46" className="text-muted" style={{margin: '0px 10px'}} />
				<Field
					name={`${header}.value`}
					type="text"
					component="input"
					className="form-control"
					placeholder="Value"
				/>
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

export default connect(mapStateToProps)(FixedValues)