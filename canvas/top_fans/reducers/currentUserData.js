import _ from 'lodash'

const currentUserData = (state = { 
	likes: null,
	comments: null,
	name: null,
	identifier: null
}, action) => {
	switch (action.type) {
		case 'RECEIVE_CURRENT_USER':
			return action.payload
		default:
			return state
	}
}

export default currentUserData