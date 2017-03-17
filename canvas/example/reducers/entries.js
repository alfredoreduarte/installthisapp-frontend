import _ from 'lodash'

const entities = (state = {}, action) => {
	switch (action.type) {
		case 'VOTE':
			return Object.assign({}, state[action.id], {
				votesCount: state[action.id].votesCount + 1
			})
		default:
			return state
	}
}

export default entities