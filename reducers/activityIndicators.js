const activityIndicators = (state = {
	appCreation: false
}, action) => {
	switch (action.type) {
		case 'TOGGLE_ACTIVITY/CREATING_APP':
			return Object.assign({}, state, {
				appCreation: !state.appCreation
			})
		default:
			return state
	}
}

export default activityIndicators