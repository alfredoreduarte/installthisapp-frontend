const media = (state = {}, action) => {
	switch (action.type) {
		case 'CATALOG/REMOVE_MEDIUM':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					status: 'deleted'
				}
			}
		case 'CATALOG/ADD_MEDIUM':
			return {
				...state,
				[action.medium.id]: {
					...action.medium,
				}
			}
		default:
			return state
	}
}

export default media