const user = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_USER':
			const { id, name, email, fbId, fbLikes, fbPages } = action;
			return { 
				id, 
				name, 
				email, 
				fbId, 
				fbLikes, 
				fbPages 
			}
		default:
			return state;
	}
}

const users = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_DATA':
			if (action.json.users) {
				return action.json.users.map(user => user)
			}
			return state;
		default:
			return state;
	}
}

export default users;