const admin = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_ADMIN':
			return Object.assign({}, state, action.payload)
		default:
			return state;
	}
}

export default admin;