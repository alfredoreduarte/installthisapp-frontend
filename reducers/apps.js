const apps = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_APPS':
			return action.payload
		default:
			return state;
	}
}

export default apps;