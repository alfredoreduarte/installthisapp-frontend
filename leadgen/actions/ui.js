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