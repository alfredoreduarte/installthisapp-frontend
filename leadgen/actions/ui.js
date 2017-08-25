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