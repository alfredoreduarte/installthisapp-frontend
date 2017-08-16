import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import DestinationCreatorView from 'leadgen/components/DestinationCreator'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { newFbLeadDestination, destroyFbLeadDestination, fetchDestinationTypeSettings } from 'leadgen/actions/fbLeadDestinations'
import { hideDestinationsForm, showDestinationsForm } from 'leadgen/actions/ui'
import { setAppToDelete } from 'actions/deleteApp'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let DestinationCreator = ({ 
	pristine,
	submitting,
	change,
	reset,
	valid,
	handleSubmit,
	destinationTypes,
	fbLeadforms,
	selectedDestinationType,
	selectedFbLeadformId,
	handleDestinationTypeChange,
	// destinationSettings,
}) => (
	<DestinationCreatorView
		pristine={pristine}
		submitting={submitting}
		change={change}
		reset={reset}
		valid={valid}
		handleSubmit={handleSubmit}
		destinationTypes={destinationTypes}
		fbLeadforms={fbLeadforms}
		selectedDestinationType={selectedDestinationType}
		selectedFbLeadformId={selectedFbLeadformId}
		handleDestinationTypeChange={handleDestinationTypeChange}
	/>
)

const validate = values => {
	const errors = {}
	if (errors.settings === undefined) {
		errors.settings = {}
	}
	if (!values.destinationType) {
		errors.destinationType = 'Required'
	}
	if (!values.fbLeadformId) {
		errors.fbLeadformId = 'Required'
	}
	if (values.destinationType == 'email') {
		if (values.settings === undefined) {
			errors.settings = {
				recipients: 'Required'
			}
		} else if (!values.settings.recipients) {
			errors.settings.recipients = 'Required'
		}
	}
	if (values.destinationType == 'mailchimp') {
		if (values.settings === undefined) {
			errors.settings = {
				listId: 'Required',
				apiKey: 'Required',
			}
		} 
		else {
			if (!values.settings.apiKey) {
				errors.settings.apiKey = 'Required'
			}
			else if (!values.settings.listId) {
				errors.settings.listId = 'Required'
			}
		}
	}
	if (values.destinationType == 'webhook') {
		if (values.settings === undefined) {
			errors.settings = {
				url: 'Required',
			}
		} 
		else {
			console.log('llega aca 1 ', values.settings.url)
			console.log('llega aca 2 ', values.settings)
			if (!values.settings.url) {
				errors.settings.url = 'Required'
			}
		}
	}
	return errors
}

const reduxFormName = 'fbLeadDestinationCreate'

const selector = formValueSelector(reduxFormName)

DestinationCreator = reduxForm({
	form: reduxFormName,
	validate,
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
	]
	return {
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