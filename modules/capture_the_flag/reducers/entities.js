const entities = (state = {}, action) => {
	switch (action.type) {
		case 'CAPTURE_THE_FLAG/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities
