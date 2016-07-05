const apps = (state = {}, action) => {
	switch (action.type) {
		default:
			if (action.entities && action.entities.apps) {
				return Object.assign({}, state, action.entities.apps)
			}
			return state
	}
}

export default apps