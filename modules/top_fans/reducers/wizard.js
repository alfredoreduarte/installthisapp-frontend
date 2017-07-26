const wizard = (state = {
	step: 0,
	fbPageIdentifier: null,
	trackFromDate: false,
	showDatePicker: false,
}, action) => {
	switch (action.type) {
		case 'UPDATE_WIZARD_STEP':
			// return action.step
			return {
				...state,
				step: action.step,
			}
		case 'WIZARD_UPDATE_FB_PAGE':
			// return action.step
			return {
				...state,
				fbPageIdentifier: action.value,
			}
		case 'WIZARD_TOGGLE_TRACK_FROM_DATE':
			// return action.step
			return {
				...state,
				trackFromDate: action.value,
			}
		case 'WIZARD_TOGGLE_DATE_PICKER':
			// return action.step
			return {
				...state,
				showDatePicker: !state.showDatePicker,
			}
		default:
			return state
	}
}

export default wizard