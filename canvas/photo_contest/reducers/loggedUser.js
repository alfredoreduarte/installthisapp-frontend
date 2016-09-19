import Cookies from 'js-cookie'

const loggedUser = (state = { 
	id: Cookies.get('loggedUserId') || null,
}, action) => {
	switch (action.type) {
		case 'LOG_USER_IN':
			return { id: action.id }
		default:
			return state
	}
}

export default loggedUser