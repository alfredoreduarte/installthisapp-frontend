const ui = (state = {
	sourcesFormVisible: false,
	destinationsFormVisible: false,
	activityIndicators: {
		leadgenForm: false,
	},
	destinationCreated: null,
}, action) => {
	switch (action.type) {
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