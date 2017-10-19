const entities = (state = {}, action) => {
	switch (action.type) {
		case 'COUPONS/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities