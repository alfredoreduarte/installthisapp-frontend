const apps = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'deleted'
				})
			})
		default:
			return state
	}
}

export default apps