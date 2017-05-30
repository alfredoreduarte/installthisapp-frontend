const products = (state = {}, action) => {
	switch (action.type) {
		case 'CATALOG/REMOVE_PRODUCT':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					status: 'deleted'
				}
			}
		default:
			return state
	}
}

export default products