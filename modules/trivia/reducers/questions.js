const questions = (state = {}, action) => {
	switch (action.type) {
		case 'TRIVIA/DELETE_QUESTION':
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

export default questions