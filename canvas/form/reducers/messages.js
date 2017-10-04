const messages = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_MESSAGES':
			return {
				...state,
				...action.payload,
				fetched: true,
			}
		default:
			return state
	}
}

export default messages