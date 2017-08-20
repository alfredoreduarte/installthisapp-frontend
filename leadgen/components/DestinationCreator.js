import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'
import RenderHttpHeaders from 'leadgen/components/RenderHttpHeaders'

const DestinationCreator = ({ 
	pristine,
	submitting,
	reset,
	change,
	valid,
	handleSubmit,
	destinationTypes,
	fbLeadforms,
	// destinationSettings,
	selectedDestinationType,
	selectedFbLeadformId,
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
	<div className={`form-group ${!selectedDestinationType ? 'hide' : null}`}>
		<label className="control-label">Receive data from Source</label>
		<Field name="fbLeadformId" component="select" className="form-control">
			<option value={''} disabled>-- Select a source --</option>
			{fbLeadforms.map(fbLeadform => 
				<option 
					key={fbLeadform.id} 
					value={fbLeadform.id} 
					className="text-capitalize">
					{fbLeadform.fbPageName} | Form ID {fbLeadform.fbFormId}</option>
			)}
		</Field>
	</div>
	{selectedDestinationType == 'email' && selectedFbLeadformId ?
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
	: null}
	{selectedDestinationType == 'mailchimp' && selectedFbLeadformId ?
	<div>
		<div className="form-group">
			<label className="control-label">Mailchimp API Key</label>
			<Field
				name={'settings.apiKey'}
				className="form-control"
				type="text"
				component="input" />
			<p className="help-block">You create and copy-paste your MailChimp API Key from <b>Account Settings > Extras > API Keys</b>.</p>
		</div>
		<div className="form-group">
			<label className="control-label">List ID</label>
			<Field
				name={'settings.listId'}
				className="form-control"
				type="text"
				component="input" />
			<span></span>
			<p className="help-block">You can find your List ID in your <b>Mailchimp list's Settings</b> pane under <b>List Name & Defaults</b>. Your list ID will be at the top of the right column.</p>
		</div>
		<p><a href="http://help.installthisapp.com/lead-ads-integrations/how-to-find-your-mailchimp-api-key-and-list-id" target="_blank">Need Help?</a></p>
	</div>
	: null}
	{selectedDestinationType == 'webhook' && selectedFbLeadformId ?
	<div>
		<div className="form-group">
			<label className="control-label">URL to POST</label>
			<Field
				name={'settings.url'}
				className="form-control"
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
	: null}
	<button 
		type="submit" 
		className="btn btn-primary btn-block" 
		disabled={!valid || submitting}>Save Destination</button>
</form>

export default DestinationCreator