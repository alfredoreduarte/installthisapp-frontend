import _ from 'lodash'

const questions = (state = { question: 'question uno'}, action) => {
	switch (action.type) {
		case 'ADD_QUESTION':
			return state
		default:
			return state
	}
}

export default questions