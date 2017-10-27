import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, FieldArray, reduxForm } from 'redux-form'
import FaClose from 'react-icons/lib/fa/close'
// import SuccessfulPurchase from 'components/SuccessfulPurchase'
import WebhookForm from 'leadgen/components/destinations/webhook/Form'
import MailChimpForm from 'leadgen/components/destinations/mailchimp/Form'
import EmailForm from 'leadgen/components/destinations/email/Form'

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
	handleDestinationSourceChange,
}) => (
	<form onSubmit={e => handleSubmit(e).then(() => reset())}>
		<div className="form-group">
			<label className="control-label">Destination type</label>
			<Field
				name="destinationType"
				component="select"
				className="form-control"
				onChange={e => {
					handleDestinationTypeChange(e.target.value)
					change('destinationType', e.target.value)
				}}>
				<option value={''} disabled>
					- Email, Webhooks, MailChimp... -
				</option>
				{destinationTypes.map(destinationType => (
					<option
						key={destinationType.type}
						value={destinationType.type}
						disabled={!destinationType.enabled}
						className="text-capitalize">
						{destinationType.label}
					</option>
				))}
			</Field>
		</div>
		<div className={`form-group ${!selectedDestinationType ? 'hidee' : null}`}>
			<label className="control-label">Receive data from Source</label>
			<Field
				name="fbLeadformId"
				component="select"
				className="form-control"
				onChange={e => {
					handleDestinationSourceChange(e.target.value)
					change('fbLeadformId', e.target.value)
				}}>
				<option value={''} disabled>
					-- Select a source --
				</option>
				{fbLeadforms.map(fbLeadform => (
					<option key={fbLeadform.id} value={fbLeadform.id} className="text-capitalize">
						{fbLeadform.fbPageName} | {fbLeadform.fbFormName}
					</option>
				))}
			</Field>
		</div>
		{selectedDestinationType == 'email' && selectedFbLeadformId ? <EmailForm /> : null}
		{selectedDestinationType == 'mailchimp' && selectedFbLeadformId ? <MailChimpForm /> : null}
		{selectedDestinationType == 'webhook' && selectedFbLeadformId ? <WebhookForm /> : null}
		<button type="submit" className="btn btn-primary btn-block" disabled={!valid || submitting}>
			Save Destination
		</button>
	</form>
)

export default DestinationCreator
