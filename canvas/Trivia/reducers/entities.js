import _ from 'lodash'

const questions = (state = {}, action) => {
	switch (action.type) {
		case 'ANSWER_QUESTION':
			if (state.id !== action.id) {
				return state
			}
			return Object.assign({}, state, {
				answered: !state.answered
			})
		default:
			return state
	}
}

const entities = (state = { questions: {}, options: {} }, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		case 'ANSWER_QUESTION':
			return Object.assign({}, state, {
				questions: state.questions.map(q => questions(q, action))
			})
		default:
			return state
	}
}

export default entities