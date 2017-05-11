const settings = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_SETTINGS':
			return {
				...state,
				fetched: true,
				...action.payload
			}
		default:
			return state
	}
}

export default settings