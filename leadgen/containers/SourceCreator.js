import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm, formValueSelector, change, destroy } from 'redux-form'
import { connect } from 'react-redux'
import SourceCreatorView from 'leadgen/components/SourceCreator'
import { getAllPages } from 'selectors/pages'
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'
import { getFbLeadgenForms } from 'leadgen/selectors/fbLeadgenForms'
import { newFbLeadform, destroyFbLeadform, fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'
import { newFbLeadDestination, destroyFbLeadDestination, fetchDestinationTypeSettings } from 'leadgen/actions/fbLeadDestinations'
import { hideSourcesForm, hideDestinationsForm, showDestinationsForm, showSourceTestModal } from 'leadgen/actions/ui'

let SourceCreator = props => <SourceCreatorView { ...props } />

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
		selectedFbPageIdentifier: selector(state, 'fbPageIdentifier'),
		fbPages: getAllPages(state),
		fetchingLeadgenForms: state.leadgenUI.activityIndicators.leadgenForm,
		fbLeadgenForms: getFbLeadgenForms(state),
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		handlePageChange: value => {
			if (value) {
				dispatch(change('fbLeadFormCreate', 'fbFormId', null))
				return dispatch(fetchLeadgenFormsForPage(value))
			}
		},
		fetchLeadgenForms: value => dispatch(fetchLeadgenFormsForPage(value)),
		handleSubmit: e => {
			e.preventDefault()
			return dispatch(newFbLeadform()).then(elForm => {
				dispatch(hideSourcesForm())
				dispatch(destroy(reduxFormName))
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCreator)