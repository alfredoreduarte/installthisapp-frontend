const answers = (state = {}, action) => {
	switch (action.type) {
		case 'TRIVIA/DELETE_ANSWER':
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

export default answers