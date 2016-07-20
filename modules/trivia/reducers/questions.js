const questions = (state = {}, action) => {
	switch (action.type) {
		case 'TRIVIA/DELETE_QUESTION':
			return Object.assign({}, state, {
				[action.id]: Object.assign({}, state[action.id], {
					status: 'deleted'
				})
			})
		default:
			return state
	}
}

export default questions