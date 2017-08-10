import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import AdminDashboardView from 'leadgen/components/AdminDashboard'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { newFbLeadform, destroyFbLeadform } from 'leadgen/actions/fbLeadforms'
import { setAppToDelete } from 'actions/deleteApp'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let AdminDashboard = ({ 
	pristine,
	submitting,
	handleSubmit,
	handleDeleteFbLeadform,
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbPages,
	// successfulPurchase,
}) => (
	<AdminDashboardView
		pristine={pristine}
		submitting={submitting}
		handleSubmit={handleSubmit}
		handleDeleteFbLeadform={handleDeleteFbLeadform}
		fbProfile={fbProfile}
		connectingToFacebook={connectingToFacebook}
		fbLoginCallback={fbLoginCallback}
		fbLeadforms={fbLeadforms}
		fbPages={fbPages}
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
		// successfulPurchase: props.location.query["successful-purchase"],
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		fbLoginCallback: response => dispatch(fbConnect(response)),
		handleSubmit: e => {
			e.preventDefault()
			dispatch(newFbLeadform())
		},
		handleDeleteFbLeadform: id => dispatch(destroyFbLeadform(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)