const settings = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_SETTINGS':
			return {
				...state,
				...action.payload,
				fetched: true,
			}
		default:
			return state
	}
}

export default settings