const pages = (state = {}, action) => {
	switch (action.type) {
		default:
			if (action.entities && action.entities.pages) {
				return Object.assign({}, state, action.entities.pages)
			}
			return state
	}
}

export default pages