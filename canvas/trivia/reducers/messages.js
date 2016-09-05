const messages = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_MESSAGES':
			return _.merge({}, state, action.payload)
		default:
			return state
	}
}

export default messages