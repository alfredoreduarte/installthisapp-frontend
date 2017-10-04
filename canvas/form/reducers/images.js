const images = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_IMAGES':
			return {
				...state,
				...action.payload,
				fetched: true,
			}
		default:
			return state
	}
}

export default images