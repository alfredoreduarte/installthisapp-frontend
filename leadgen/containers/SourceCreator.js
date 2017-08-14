import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import SourceCreatorView from 'leadgen/components/SourceCreator'
import { getAllPages } from 'selectors/pages'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
// import { getFbLeadDestinationSettings } from 'leadgen/selectors/fbLeadDestinations'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { newFbLeadDestination, destroyFbLeadDestination, fetchDestinationTypeSettings } from 'leadgen/actions/fbLeadDestinations'
import { hideSourcesForm, hideDestinationsForm, showDestinationsForm } from 'leadgen/actions/ui'
import { setAppToDelete } from 'actions/deleteApp'
import { fbConnect } from 'actions/admin'
import { deleteApp, destroy } from 'actions/apps'

let SourceCreator = ({ 
	pristine,
	submitting,
	reset,
	valid,
	change,
	handleSubmit,
	fbPages,
	handlePageChange,
	hasSelectedPage,
	fetchingLeadgenForm,
	fbLeadgenForms,
}) => (
	<SourceCreatorView
		pristine={pristine}
		submitting={submitting}
		reset={reset}
		valid={valid}
		change={change}
		handleSubmit={handleSubmit}
		fbPages={fbPages}
		hasSelectedPage={hasSelectedPage}
		handlePageChange={handlePageChange}
		fetchingLeadgenForm={fetchingLeadgenForm}
		fbLeadgenForms={fbLeadgenForms}
	/>
)

const validate = values => {
	const errors = {}
	if (!values.fbPageIdentifier) {
		errors.fbPageIdentifier = 'Required'
	}
	if (!values.fbFormId) {
		errors.fbFormId = 'Required'
	}
	return errors
}

const reduxFormName = 'fbLeadFormCreate'

const selector = formValueSelector(reduxFormName)

SourceCreator = reduxForm({
	form: reduxFormName,
	validate,
})(SourceCreator)

const mapStateToProps = (state, props) => {
	return {
		// Sloppy validation
		hasSelectedPage: selector(state, 'fbPageIdentifier'),
		// 
		fbPages: getAllPages(state),
		fetchingLeadgenForm: state.leadgenUI.activityIndicators.leadgenForm,
		fbLeadgenForms: getFbLeadgenForms(state),
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		handlePageChange: value => {
			if (value) {
				return dispatch(fetchLeadgenFormsForPage(value))
			}
		},
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadform()).then(() => {
				dispatch(hideSourcesForm())
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCreator)