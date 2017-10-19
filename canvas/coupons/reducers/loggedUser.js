import Cookies from 'js-cookie'

const loggedUser = (state = { 
	id: Cookies.get('loggedUserId') || window.loggedUserId,
	identifier: Cookies.get('loggedUserIdentifier') || window.loggedUserIdentifier,
	name: Cookies.get('loggedUserName') || window.loggedUserName,
}, action) => {
	switch (action.type) {
		case 'LOG_USER_IN':
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}

export default loggedUser