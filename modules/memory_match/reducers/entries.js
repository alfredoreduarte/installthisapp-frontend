const entries = (state = {}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/REMOVE_ENTRY':
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

export default entries