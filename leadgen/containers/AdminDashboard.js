import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import AdminDashboardView from 'leadgen/components/AdminDashboard'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getLeadDestinationsWithMetadata } from 'leadgen/selectors/fbLeadDestinations'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { destroyFbLeadDestination } from 'leadgen/actions/fbLeadDestinations'
import { setAppToDelete } from 'actions/deleteApp'
import { hideSourcesForm, showSourcesForm, hideDestinationsForm, showDestinationsForm } from 'leadgen/actions/ui'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let AdminDashboard = ({ 
	pristine,
	submitting,
	change,
	reset,
	handleSubmit,
	handlePageChange,
	handleDeleteFbLeadform,
	handleDeleteFbLeadDestination,
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbLeadDestinations,
	fbPages,
	fbLeadgenForms,
	sourcesFormVisible,
	destinationsFormVisible,
	// successfulPurchase,
	hideSourcesForm,
	showSourcesForm,
	hideDestinationsForm,
	showDestinationsForm,
}) => (
	<AdminDashboardView
		pristine={pristine}
		hideSourcesForm={hideSourcesForm}
		showSourcesForm={showSourcesForm}
		hideDestinationsForm={hideDestinationsForm}
		showDestinationsForm={showDestinationsForm}
		sourcesFormVisible={sourcesFormVisible}
		destinationsFormVisible={destinationsFormVisible}
		submitting={submitting}
		change={change}
		reset={reset}
		handleSubmit={handleSubmit}
		handlePageChange={handlePageChange}
		handleDeleteFbLeadform={handleDeleteFbLeadform}
		handleDeleteFbLeadDestination={handleDeleteFbLeadDestination}
		fbProfile={fbProfile}
		connectingToFacebook={connectingToFacebook}
		fbLoginCallback={fbLoginCallback}
		fbLeadDestinations={fbLeadDestinations}
		fbLeadforms={fbLeadforms}
		fbPages={fbPages}
		fbLeadgenForms={fbLeadgenForms}
		// successfulPurchase={successfulPurchase}
	/>
)

AdminDashboard = reduxForm({
	form: 'fbLeadFormCreate',
})(AdminDashboard)

const mapStateToProps = (state, props) => {
	return {
		fbProfile: state.admin.fbProfile,
		fbLeadforms: getLeadformsWithPages(state),
		fbPages: getAllPages(state),
		fbLeadgenForms: getFbLeadgenForms(state),
		fbLeadDestinations: getLeadDestinationsWithMetadata(state),
		// successfulPurchase: props.location.query["successful-purchase"],
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		sourcesFormVisible: state.leadgenUI.sourcesFormVisible,
		destinationsFormVisible: state.leadgenUI.destinationsFormVisible,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		fbLoginCallback: response => dispatch(fbConnect(response)),
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadform())
		},
		handleDeleteFbLeadform: id => dispatch(destroyFbLeadform(id)),
		handleDeleteFbLeadDestination: id => dispatch(destroyFbLeadDestination(id)),
		handlePageChange: value => {
			if (value) {
				return dispatch(fetchLeadgenFormsForPage(value))
			}
		},
		hideSourcesForm: () => dispatch(hideSourcesForm()),
		showSourcesForm: () => dispatch(showSourcesForm()),
		hideDestinationsForm: () => dispatch(hideDestinationsForm()),
		showDestinationsForm: () => dispatch(showDestinationsForm()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)