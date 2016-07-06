const apps = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_APPS':
			return Object.assign({}, state, action.entities.apps)
		default:
			return state
	}
}

export default apps