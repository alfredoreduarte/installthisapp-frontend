import { initialize } from 'redux-form'
import { getEditingDestination } from 'leadgen/selectors/fbLeadDestinations'
import { getEditingSource } from 'leadgen/selectors/fbLeadforms'
import { fetchLeadgenFormsForPage } from 'leadgen/actions/fbLeadforms'

export const showSourcesForm = () => ({
	type: 'LEADGEN_UI/SHOW_SOURCES_FORM'
})
export const hideSourcesForm = () => ({
	type: 'LEADGEN_UI/HIDE_SOURCES_FORM'
})

export const showDestinationsForm = () => ({
	type: 'LEADGEN_UI/SHOW_DESTINATIONS_FORM'
})
export const setDefaultLeadFormForDestinationCreation = id => ({
	type: 'LEADGEN_UI/SET_DEFAULT_LEADFORM',
	id,
})
export const resetDefaultLeadFormForDestinationCreation = () => ({
	type: 'LEADGEN_UI/RESET_DEFAULT_LEADFORM',
})
export const hideDestinationsForm = () => ({
	type: 'LEADGEN_UI/HIDE_DESTINATIONS_FORM'
})

// test leads
export const resetTestLead = () => ({
	type: 'LEADGEN_UI/TEST_LEAD/RESET'
})
export const indicateLeadTestSent = () => ({
	type: 'LEADGEN_UI/TEST_LEAD/SENT'
})
export const indicateLeadTestReceived = () => ({
	type: 'LEADGEN_UI/TEST_LEAD/RECEIVED'
})
export const indicateLeadTestBroadcasted = () => ({
	type: 'LEADGEN_UI/TEST_LEAD/BROADCASTED'
})
// test leads

// testing sources
export const showSourceTestModal = sourceId => ({
	type: 'LEADGEN_UI/SOURCES/SHOW_TEST_MODAL',
	sourceId,
})

export const hideSourceTestModal = () => ({
	type: 'LEADGEN_UI/SOURCES/HIDE_TEST_MODAL'
})

export const receiveTestLeadData = lead => ({
	type: 'LEADGEN_UI/SOURCES/RECEIVE_TEST_DATA',
	lead,
})
// testing sources

export const toggleLeadgenFormSpinner = () => ({
	type: 'LEADGEN_UI/SPINNER/LEADGEN_FORM'
})

export const showDestinationSuccessModal = destinationId => ({
	type: 'LEADGEN_UI/DESTINATIONS/SHOW_SUCCESS_MODAL',
	destinationId,
})

export const hideDestinationSuccessModal = () => ({
	type: 'LEADGEN_UI/DESTINATIONS/HIDE_SUCCESS_MODAL'
})

export const setEditingDestination = id => ({
	type: 'LEADGEN_UI/EDIT_DESTINATION',
	id
})

export const setDestinationFormDefaults = id => {
	return (dispatch, getState) => {
		dispatch(setEditingDestination(id))
		const destination = getEditingDestination(getState())
		return dispatch(initialize('fbLeadDestinationCreate', destination))
	}
}

export const setEditingSource = id => ({
	type: 'LEADGEN_UI/EDIT_FORM',
	id
})

export const setSourceFormDefaults = id => {
	return (dispatch, getState) => {
		dispatch(setEditingSource(id))
		const source = getEditingSource(getState())
		dispatch(fetchLeadgenFormsForPage(source.fbPageIdentifier))
		return dispatch(initialize('fbLeadFormCreate', source))
	}
}