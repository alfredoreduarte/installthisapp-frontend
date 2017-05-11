const messages = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_MESSAGES':
			return {
				...state,
				fetched: true,
				...action.payload,
			}
		default:
			return state
	}
}

export default messages