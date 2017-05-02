const categories = (state = {}, action) => {
	switch (action.type) {
		case 'CATALOG/REMOVE_CATEGORY':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					status: 'deleted'
				}
			}
		case 'CATALOG/ADD_CATEGORY':
			return {
				...state,
				[action.category.id]: {
					...action.medium,
				}
			}
		default:
			return state
	}
}

export default categories