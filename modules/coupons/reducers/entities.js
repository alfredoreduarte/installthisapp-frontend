const entities = (state = {}, action) => {
	switch (action.type) {
		case 'COUPONS/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		case 'COUPONS/REMOVE_VOUCHER':
			return {
				...state,
				vouchers: {
					...state.vouchers,
					[action.id]: {
						...state.vouchers[action.id],
						status: 'deleted',
					}
				}
			}
		default:
			return state
	}
}

export default entities