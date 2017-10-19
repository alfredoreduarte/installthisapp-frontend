const coupon = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_COUPON':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default coupon