const messages = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_MESSAGES':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default messages