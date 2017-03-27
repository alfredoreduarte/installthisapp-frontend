const images = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_IMAGES':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default images