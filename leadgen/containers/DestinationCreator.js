import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import DestinationCreatorView from 'leadgen/components/DestinationCreator'
import { getAllPages } from 'selectors/pages'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { newFbLeadDestination, destroyFbLeadDestination, fetchDestinationTypeSettings } from 'leadgen/actions/fbLeadDestinations'
import { hideDestinationsForm, showDestinationsForm } from 'leadgen/actions/ui'

import emailValidator from 'leadgen/components/destinations/email/validator'
import mailChimpValidator from 'leadgen/components/destinations/mailchimp/validator'
import webhookValidator from 'leadgen/components/destinations/webhook/validator'

let DestinationCreator = props => <DestinationCreatorView { ...props } />

const validate = values => {
	let errors = {}
	if (errors.settings === undefined) {
		errors.settings = {}
	}
	if (!values.destinationType) {
		errors.destinationType = 'Required'
	}
	if (!values.fbLeadformId) {
		errors.fbLeadformId = 'Required'
	}
	if (values.destinationType == 'email') 		{ errors = emailValidator(values, errors) }
	if (values.destinationType == 'mailchimp') 	{ errors = mailChimpValidator(values, errors) }
	if (values.destinationType == 'webhook') 	{ errors = webhookValidator(values, errors) }
	return errors
}

const reduxFormName = 'fbLeadDestinationCreate'

const selector = formValueSelector(reduxFormName)

DestinationCreator = reduxForm({
	form: reduxFormName,
	validate,
	enableReinitialize: true,
})(DestinationCreator)

const mapStateToProps = (state, props) => {
	const destinationTypes = [
		{
			label: 'Email',
			type: 'email',
			enabled: true,
		},
		{
			label: 'Webhook',
			type: 'webhook',
			enabled: true,
		},
		{
			label: 'Mailchimp',
			type: 'mailchimp',
			enabled: true,
		},
		{
			label: 'PipeDrive',
			type: 'pipedrive',
			enabled: false,
		},
		{
			label: 'Intercom',
			type: 'intercom',
			enabled: false,
		},
		{
			label: 'Aweber',
			type: 'aweber',
			enabled: false,
		},
		{
			label: 'ActiveCampaign',
			type: 'active_campaign',
			enabled: false,
		},
		{
			label: 'Slack',
			type: 'slack',
			enabled: false,
		},
		{
			label: 'Campaign Monitor',
			type: 'campaign_monitor',
			enabled: false,
		},
	]
	let initialValues = {}
	const selectedValues = selector(state, 'destinationType', 'fbLeadformId')
	if (!state.leadgenUI.editingDestinationId) {
		if (selectedValues.destinationType == 'email') {
			initialValues = {
				...selectedValues,
				settings: {
					recipients: state.admin.email,
				}
			}
		}
		else if (selectedValues.destinationType == 'webhook') {
			initialValues = {
				...selectedValues,
				settings: {
					payloadType: 'json',
				}
			}
		}
		else {
			initialValues = { ...selectedValues }
		}
	}
	return {
		initialValues: initialValues,
		selectedDestinationType: selector(state, 'destinationType'),
		selectedFbLeadformId: selector(state, 'fbLeadformId'),
		fbLeadforms: getLeadformsWithPages(state),
		destinationTypes: destinationTypes,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadDestination()).then(() => {
				dispatch(hideDestinationsForm())
				dispatch(destroy(reduxFormName))
			})
		},
		handleDestinationTypeChange: value => {
			// if (value) {
				// return dispatch(fetchDestinationTypeSettings(value))
			// }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCreator)