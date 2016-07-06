const admin = (state = {}, action) => {
	switch (action.type) {
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