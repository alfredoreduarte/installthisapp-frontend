const usersSorting = (state = 'name', action) => {
	switch (action.type) {
		case 'SORT_USERS':
			return action.payload
		default:
			return state
	}
}

export default usersSorting