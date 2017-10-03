const entities = (state = {
	fetched: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTITIES':
			return {
				...state,
				fetched: true,
				...action.entities,
			}
		default:
			return state
	}
}

export default entities