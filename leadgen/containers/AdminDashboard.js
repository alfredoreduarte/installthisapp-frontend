import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import AdminDashboardView from 'leadgen/components/AdminDashboard'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getLeadDestinationsWithMetadata } from 'leadgen/selectors/fbLeadDestinations'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { sendTestLead, newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { destroyFbLeadDestination } from 'leadgen/actions/fbLeadDestinations'
import { setAppToDelete } from 'actions/deleteApp'
import { hideSourcesForm, showSourcesForm, hideDestinationsForm, showDestinationsForm } from 'leadgen/actions/ui'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let AdminDashboard = ({ 
	adminId,
	adminName,
	hasSelectedPage,
	hasSelectedForm,
	// 
	fetchingLeadgenForm,
	// handlePageChange,
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
	hideSourcesForm,
	showSourcesForm,
	hideDestinationsForm,
	showDestinationsForm,
}) => (
	<AdminDashboardView
		adminId={adminId}
		adminName={adminName}
		fetchingLeadgenForm={fetchingLeadgenForm}
		hasSelectedPage={hasSelectedPage}
		hasSelectedForm={hasSelectedForm}
		hideSourcesForm={hideSourcesForm}
		showSourcesForm={showSourcesForm}
		hideDestinationsForm={hideDestinationsForm}
		showDestinationsForm={showDestinationsForm}
		sourcesFormVisible={sourcesFormVisible}
		destinationsFormVisible={destinationsFormVisible}
		// handlePageChange={handlePageChange}
		handleDeleteFbLeadform={handleDeleteFbLeadform}
		handleDeleteFbLeadDestination={handleDeleteFbLeadDestination}
		fbProfile={fbProfile}
		connectingToFacebook={connectingToFacebook}
		fbLoginCallback={fbLoginCallback}
		fbLeadDestinations={fbLeadDestinations}
		fbLeadforms={fbLeadforms}
		// fbPages={fbPages}
		fbLeadgenForms={fbLeadgenForms}
	/>
)

const mapStateToProps = (state, props) => {
	return {
		adminId: state.admin.id,
		adminName: state.admin.name,
		fbProfile: state.admin.fbProfile,
		fbLeadforms: getLeadformsWithPages(state),
		// fbPages: getAllPages(state),
		fbLeadDestinations: getLeadDestinationsWithMetadata(state),
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		sourcesFormVisible: state.leadgenUI.sourcesFormVisible,
		destinationsFormVisible: state.leadgenUI.destinationsFormVisible,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	const reset = props.reset
	return {
		fbLoginCallback: response => dispatch(fbConnect(response)),
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadform()).then(() => {
				dispatch(hideSourcesForm())
			})
		},
		handleDeleteFbLeadform: id => dispatch(destroyFbLeadform(id)),
		handleDeleteFbLeadDestination: id => dispatch(destroyFbLeadDestination(id)),
		// sendTest: id => {
		// 	return dispatch(sendTestLead(id))
		// },
		hideSourcesForm: () => dispatch(hideSourcesForm()),
		showSourcesForm: () => dispatch(showSourcesForm()),
		hideDestinationsForm: () => dispatch(hideDestinationsForm()),
		showDestinationsForm: () => dispatch(showDestinationsForm()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)