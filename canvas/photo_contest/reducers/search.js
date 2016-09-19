const search = (state = '', action) => {
	switch (action.type) {
		case 'SEARCH_PHOTOS':
			return action.query
		default:
			return state
	}
}

export default search