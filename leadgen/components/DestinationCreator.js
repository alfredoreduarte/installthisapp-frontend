import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'

const DestinationCreator = ({ 
	pristine,
	submitting,
	reset,
	change,
	handleSubmit,
	destinationTypes,
	fbLeadforms,
	// destinationSettings,
	handleDestinationTypeChange,
}) => 
<form onSubmit={e => {
	return handleSubmit(e).then(() => reset())
}}>
	<div className="form-group">
		<label className="control-label">Select type</label>
		<Field name="destinationType" component="select" className="form-control"
			onChange={e => {
				handleDestinationTypeChange(e.target.value)
				change('destinationType', e.target.value)
			}}
		>
			<option value={''} disabled>-- Select a type --</option>
			{destinationTypes.map(destinationType => 
				<option 
					key={destinationType.type} 
					value={destinationType.type} 
					disabled={!destinationType.enabled} 
					className="text-capitalize">{destinationType.label}</option>
			)}
		</Field>
	</div>
	<div className="form-group">
		<label className="control-label">Receive data from Source</label>
		<Field name="fbLeadformId" component="select" className="form-control">
			<option value={''} disabled>-- Select a source --</option>
			{fbLeadforms.map(fbLeadform => 
				<option key={fbLeadform.id} value={fbLeadform.id} className="text-capitalize">{fbLeadform.fbPageName} | Form ID {fbLeadform.fbFormId}</option>
			)}
		</Field>
	</div>
	<div className="form-group">
		<label className="control-label">Comma-separated Email recipients</label>
		<Field
			name={'settings.recipients'}
			className="form-control" 
			rows={3}
			component="textarea" />
	</div>
	<button 
		type="submit" 
		className="btn btn-primary btn-block" 
		disabled={pristine || submitting}>Save Destination</button>
</form>

export default DestinationCreator