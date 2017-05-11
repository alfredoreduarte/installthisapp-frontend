const images = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_IMAGES':
			return {
				...state,
				fetched: true,
				...action.payload
			}
		default:
			return state
	}
}

export default images