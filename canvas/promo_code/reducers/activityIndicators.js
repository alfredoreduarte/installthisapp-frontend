const activityIndicators = (
	state = {
		login: false,
	},
	action
) => {
	switch (action.type) {
		case 'TOGGLE_ACTIVITY/LOGIN':
			return {
				...state,
				login: !state.login,
			}
		default:
			return state
	}
}

export default activityIndicators
