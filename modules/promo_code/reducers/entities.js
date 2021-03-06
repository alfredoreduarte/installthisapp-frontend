const entities = (state = {}, action) => {
	switch (action.type) {
		case 'PROMO_CODE/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities
