import _ from 'lodash'

const settings = (state = {}, action) => {
	switch (action.type) {
		case 'TOP_FANS/RECEIVE_SETTINGS':
			// return [...state, action.payload]
			return action.payload
		default:
			return state
	}
}

export default settings