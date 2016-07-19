import _ from 'lodash'

const answers = (state = { answer: 'answer uno'}, action) => {
	switch (action.type) {
		case 'ADD_ANSWER':
			return state
		default:
			return state
	}
}

export default answers