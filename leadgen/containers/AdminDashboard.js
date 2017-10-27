import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import AdminDashboardView from 'leadgen/components/AdminDashboard'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getLeadDestinationsWithMetadata } from 'leadgen/selectors/fbLeadDestinations'
import { sendTestLead, destroyFbLeadform, fetchLeadgenFormsForPage, getTestLead } from 'leadgen/actions/fbLeadforms'
import { destroyFbLeadDestination } from 'leadgen/actions/fbLeadDestinations'
import {
	hideSourcesForm,
	showSourcesForm,
	hideDestinationsForm,
	showDestinationsForm,
	setDefaultLeadFormForDestinationCreation,
	hideDestinationSuccessModal,
	setDestinationFormDefaults,
	setSourceFormDefaults,
	resetTestLead,
	// sources testing
	showSourceTestModal,
} from 'leadgen/actions/ui'
import { fbConnect } from 'actions/admin'

let AdminDashboard = props => <AdminDashboardView {...props} />

const mapStateToProps = (state, props) => {
	return {
		testStatus: state.leadgenUI.testLead,
		showDestinationSuccessModal: _.find(getLeadDestinationsWithMetadata(state), { id: state.leadgenUI.destinationCreated }),
		adminId: state.admin.id,
		adminName: state.admin.name,
		fbProfile: state.admin.fbProfile,
		fbLeadforms: getLeadformsWithPages(state),
		fbLeadDestinations: getLeadDestinationsWithMetadata(state),
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
		isEditingForm: state.leadgenUI.editingFormId ? true : false,
		sourcesFormVisible: state.leadgenUI.sourcesFormVisible,
		isEditingDestination: state.leadgenUI.editingDestinationId ? true : false,
		destinationsFormVisible: state.leadgenUI.destinationsFormVisible,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		hideDestinationSuccessModal: response => {
			dispatch(resetTestLead())
			return dispatch(hideDestinationSuccessModal())
		},
		fbLoginCallback: response => dispatch(fbConnect(response)),
		handleDeleteFbLeadform: id => dispatch(destroyFbLeadform(id)),
		handleDeleteFbLeadDestination: id => dispatch(destroyFbLeadDestination(id)),
		sendTest: id => {
			dispatch(resetTestLead())
			return dispatch(sendTestLead(id, true))
		},
		editSource: id => {
			dispatch(setSourceFormDefaults(id))
			dispatch(showSourcesForm())
		},
		hideSourcesForm: () => {
			dispatch(resetTestLead())
			dispatch(destroy('fbLeadFormCreate'))
			return dispatch(hideSourcesForm())
		},
		showSourcesForm: () => dispatch(showSourcesForm()),
		editDestination: id => {
			dispatch(setDestinationFormDefaults(id))
			dispatch(showDestinationsForm())
		},
		hideDestinationsForm: () => {
			dispatch(resetTestLead())
			dispatch(destroy('fbLeadDestinationCreate'))
			return dispatch(hideDestinationsForm())
		},
		showDestinationsForm: () => {
			dispatch(resetTestLead())
			return dispatch(showDestinationsForm())
		},
		showDestinationsFormWithDefaultSourceId: id => {
			dispatch(resetTestLead())
			dispatch(setDefaultLeadFormForDestinationCreation(id))
			dispatch(getTestLead(id)).then(() => dispatch(showDestinationsForm()))
			// return dispatch( getTestLead(id) ).then( () => dispatch( showDestinationsForm() ) )
			// return dispatch( showDestinationsForm() )
		},
		// sources testing
		showSourceTestModal: id => dispatch(showSourceTestModal(id)),
		sendSourceTest: id => dispatch(sendTestLead(id, false)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
