import _ from 'lodash'

const entries = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_ENTRIES':
			return action.response.entities
		default:
			return state
	}
}

export default entries