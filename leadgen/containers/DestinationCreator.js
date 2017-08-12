import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import DestinationCreatorView from 'leadgen/components/DestinationCreator'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getFbLeadDestinationSettings } from 'leadgen/selectors/fbLeadDestinations'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { newFbLeadDestination, destroyFbLeadDestination, fetchDestinationTypeSettings } from 'leadgen/actions/fbLeadDestinations'
import { setAppToDelete } from 'actions/deleteApp'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let DestinationCreator = ({ 
	pristine,
	submitting,
	change,
	reset,
	handleSubmit,
	destinationTypes,
	fbLeadforms,
	handleDestinationTypeChange,
	destinationSettings,
}) => (
	<DestinationCreatorView
		pristine={pristine}
		submitting={submitting}
		change={change}
		reset={reset}
		handleSubmit={handleSubmit}
		destinationTypes={destinationTypes}
		fbLeadforms={fbLeadforms}
		destinationSettings={destinationSettings}
		handleDestinationTypeChange={handleDestinationTypeChange}
	/>
)

DestinationCreator = reduxForm({
	form: 'fbLeadDestinationCreate',
})(DestinationCreator)

const mapStateToProps = (state, props) => {
	return {
		fbLeadforms: getLeadformsWithPages(state),
		destinationTypes: [
			'email',
		],
		destinationSettings: getFbLeadDestinationSettings(state),
		// fbLeadforms: getLeadformsWithPages(state),
		// fbPages: getAllPages(state),
		// fbLeadgenForms: getFbLeadgenForms(state),
		// successfulPurchase: props.location.query["successful-purchase"],
		// connectingToFacebook: state.activityIndicators.connectingToFacebook,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadDestination())
		},
		handleDestinationTypeChange: value => {
			if (value) {
				return dispatch(fetchDestinationTypeSettings(value))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCreator)