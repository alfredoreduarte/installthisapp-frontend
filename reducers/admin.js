const admin = (state = {
	currentApp: null
}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_APP':
			return { 
				...state,
				currentApp: action.checksum
			}
		case 'RECEIVE_ADMIN':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default admin