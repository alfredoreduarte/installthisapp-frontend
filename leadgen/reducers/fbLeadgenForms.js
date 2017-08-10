const fbLeadgenForms = (state = [], action) => {
	switch (action.type) {
		case 'FB_LEADGEN_FORMS/RECEIVE':
			return action.payload
		default:
			return state
	}
}

export default fbLeadgenForms