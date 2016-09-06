const photos = (state = {}, action) => {
	switch (action.type) {
		case 'PHOTO_CONTEST/DELETE_PHOTO':
			return Object.assign({}, state, {
				[action.id]: Object.assign({}, state[action.id], {
					status: 'deleted'
				})
			})
		default:
			return state
	}
}

export default photos