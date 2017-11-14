const entities = (state = {}, action) => {
	switch (action.type) {
		case 'EXAMPLE/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities
