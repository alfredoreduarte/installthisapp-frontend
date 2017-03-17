const entities = (state = {}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities