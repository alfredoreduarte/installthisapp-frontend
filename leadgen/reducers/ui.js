const ui = (state = {
	sourcesFormVisible: false,
	destinationsFormVisible: false,
	activityIndicators: {
		leadgenForm: false,
	},
	destinationCreated: null,
	editingFormId: null,
	editingDestinationId: null,
	testLead: {
		sent: false,
		receivedOnServer: false,
		sentToDestinations: false,
	},
	testingSourceWithId: null,
	sourceTestLeadData: [],
	defaultLeadFormIdForDestinationCreator: null,
}, action) => {
	switch (action.type) {
		case 'LEADGEN_UI/SET_DEFAULT_LEADFORM':
			return {
				...state,
				defaultLeadFormIdForDestinationCreator: action.id,
			}
		case 'LEADGEN_UI/RESET_DEFAULT_LEADFORM':
			return {
				...state,
				defaultLeadFormIdForDestinationCreator: null,
			}
		case 'LEADGEN_UI/TEST_LEAD/RESET':
			return {
				...state,
				testLead: {
					sent: false,
					receivedOnServer: false,
					sentToDestinations: false,
				},
				testingSourceWithId: null,
				sourceTestLeadData: [],
			}
		case 'LEADGEN_UI/TEST_LEAD/SENT':
			return {
				...state,
				testLead: {
					...state.testLead,
					sent: true
				}
			}
		case 'LEADGEN_UI/TEST_LEAD/RECEIVED':
			return {
				...state,
				testLead: {
					...state.testLead,
					receivedOnServer: true
				}
			}
		case 'LEADGEN_UI/TEST_LEAD/BROADCASTED':
			return {
				...state,
				testLead: {
					...state.testLead,
					sentToDestinations: true
				}
			}
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
		case 'LEADGEN_UI/SOURCES/SHOW_TEST_MODAL':
			return {
				...state,
				testingSourceWithId: action.sourceId,
			}
		case 'LEADGEN_UI/SOURCES/HIDE_TEST_MODAL':
			return {
				...state,
				testingSourceWithId: null,
			}
		case 'LEADGEN_UI/SOURCES/RECEIVE_TEST_DATA':
			return {
				...state,
				sourceTestLeadData: action.lead,
			}
		default:
			return state
	}
}

export default ui