const votes = (state = {}, action) => {
	switch (action.type) {
		case 'PHOTO_CONTEST/DELETE_VOTE':
			return Object.assign({}, state, {
				[action.id]: Object.assign({}, state[action.id], {
					status: 'deleted'
				})
			})
		default:
			return state
	}
}

export default votes