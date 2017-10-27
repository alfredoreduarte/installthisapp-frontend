const FbLeadDestinations = (
	state = {
		settings: [],
	},
	action
) => {
	switch (action.type) {
		case 'FB_LEAD_DESTINATION/RECEIVE_SETTINGS':
			// return [
			// ...state,
			// settings: action.payload,
			// ]
			return {
				...state,
				settings: action.payload,
			}
		default:
			return state
	}
}

export default FbLeadDestinations
