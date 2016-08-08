import _ from 'lodash'

const entities = (state = { questions: {}, options: {} }, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default entities