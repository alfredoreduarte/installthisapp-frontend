const users = (state = {}, action) => {
	switch (action.type) {
		default:
			if (action.entities && action.entities.users) {
				return Object.assign({}, state, action.entities.users)
			}
			return state
	}
}

export default users