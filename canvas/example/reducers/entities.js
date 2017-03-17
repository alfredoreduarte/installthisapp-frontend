const entities = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTITIES':
			return {
				...state,
				action.response.entities
			}
		default:
			return state
	}
}

export default entities