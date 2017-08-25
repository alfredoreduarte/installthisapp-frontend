const ui = (state = {
	sourcesFormVisible: false,
	destinationsFormVisible: false,
	activityIndicators: {
		leadgenForm: false,
	},
	destinationCreated: null,
	editingFormId: null,
	editingDestinationId: null,
}, action) => {
	switch (action.type) {
		case 'LEADGEN_UI/EDIT_FORM':
			return {
				...state,
				editingFormId: action.id,
			}
		case 'LEADGEN_UI/EDIT_DESTINATION':
			return {
				...state,
				editingDestinationId: action.id,
			}
		case 'LEADGEN_UI/SPINNER/LEADGEN_FORM':
			return {
				...state,
				activityIndicators: {
					...state.activityIndicators,
					leadgenForm: !state.activityIndicators.leadgenForm,
				}
			}
		case 'LEADGEN_UI/SHOW_SOURCES_FORM':
			return {
				...state,
				sourcesFormVisible: true,
			}
		case 'LEADGEN_UI/HIDE_SOURCES_FORM':
			return {
				...state,
				sourcesFormVisible: false,
				editingFormId: null,
			}
		case 'LEADGEN_UI/SHOW_DESTINATIONS_FORM':
			return {
				...state,
				destinationsFormVisible: true,
			}
		case 'LEADGEN_UI/HIDE_DESTINATIONS_FORM':
			return {
				...state,
				destinationsFormVisible: false,
				editingDestinationId: null,
			}
		case 'LEADGEN_UI/DESTINATIONS/SHOW_SUCCESS_MODAL':
			return {
				...state,
				destinationCreated: action.destinationId,
			}
		case 'LEADGEN_UI/DESTINATIONS/HIDE_SUCCESS_MODAL':
			return {
				...state,
				destinationCreated: null,
			}
		default:
			return state
	}
}

export default ui