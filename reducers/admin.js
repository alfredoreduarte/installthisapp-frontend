const admin = (state = {
	currentApp: null
}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_APP':
			return Object.assign({}, state, {
				currentApp: action.checksum
			})
		case 'RECEIVE_ADMIN':
			return Object.assign({}, state, action.payload)
		default:
			return state
	}
}

export default admin