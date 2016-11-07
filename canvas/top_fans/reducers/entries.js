import _ from 'lodash'

const entries = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTRIES':
			return {
				likes: action.response.entities.likes,
				comments: action.response.entities.comments,
			}
		default:
			return state
	}
}

export default entries