const questions = (state = {}, action) => {
	switch (action.type) {
		case 'ANSWER_QUESTION':
			return Object.assign({}, state, {
				[action.id]: Object.assign({}, state[action.id], {
					answered: true
				})
			})
		default:
			return state
	}
}

export default questions