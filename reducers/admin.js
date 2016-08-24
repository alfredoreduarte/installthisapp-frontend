const admin = (state = {
	currentApp: null
}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_APP':
			return Object.assign({}, state, {
				currentApp: action.checksum
			})
		case 'RECEIVE_ADMIN':
			if (action.payload) {
				return action.payload
			}
			return state
		default:
			return state
	}
}

export default admin