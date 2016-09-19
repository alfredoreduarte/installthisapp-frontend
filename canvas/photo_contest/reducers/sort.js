const sort = (state = 'mostVoted', action) => {
	switch (action.type) {
		case 'SORT_PHOTOS':
			return action.sort
		default:
			return state
	}
}

export default sort