import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import AdminDashboardView from 'leadgen/components/AdminDashboard'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { setAppToDelete } from 'actions/deleteApp'
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
	fbProfile,
	connectingToFacebook,
	fbLoginCallback,
	fbLeadforms,
	fbPages,
	fbLeadgenForms,
	// successfulPurchase,
}) => (
	<AdminDashboardView
		pristine={pristine}
		submitting={submitting}
		change={change}
		reset={reset}
		handleSubmit={handleSubmit}
		handlePageChange={handlePageChange}
		handleDeleteFbLeadform={handleDeleteFbLeadform}
		fbProfile={fbProfile}
		connectingToFacebook={connectingToFacebook}
		fbLoginCallback={fbLoginCallback}
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
		// successfulPurchase: props.location.query["successful-purchase"],
		connectingToFacebook: state.activityIndicators.connectingToFacebook,
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
		handlePageChange: value => {
			if (value) {
				// console.log(props)
				// dispatch(props.change('fbPageIdentifier', value))
				return dispatch(fetchLeadgenFormsForPage(value))
				// dispatch(fetchLeadgenFormsForPage(e.target.value))
				// return e.target.value
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)