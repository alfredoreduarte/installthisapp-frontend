const settings = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_SETTINGS':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default settings