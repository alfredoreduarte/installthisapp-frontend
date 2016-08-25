const activityIndicators = (state = {
	appCreation: false,
	appChecksumDashboardLoading: null,
}, action) => {
	switch (action.type) {
		case 'TOGGLE_ACTIVITY_ON/CREATING_APP':
			return Object.assign({}, state, {
				appCreation: true
			})
		case 'TOGGLE_ACTIVITY_OFF/CREATING_APP':
			return Object.assign({}, state, {
				appCreation: false
			})
		case 'TOGGLE_ACTIVITY_ON/LOADING_APP':
			return Object.assign({}, state, {
				appChecksumDashboardLoading: action.checksum
			})
		case 'TOGGLE_ACTIVITY_OFF/LOADING_APP':
			return Object.assign({}, state, {
				appChecksumDashboardLoading: null
			})
		default:
			return state
	}
}

export default activityIndicators