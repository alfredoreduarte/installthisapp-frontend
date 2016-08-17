import _ from 'lodash'
import questions from 'modules/trivia/reducers/questions'
import answers from 'modules/trivia/reducers/answers'

const trivia = (state = {
	questions: {},
	answers: {},
	options: {},
}, action) => {
	switch (action.type) {
		case 'TRIVIA/DELETE_QUESTION':
			return Object.assign({}, state, {
				questions: questions(state.questions, action)
			})
		case 'TRIVIA/DELETE_ANSWER':
			return Object.assign({}, state, {
				answers: answers(state.answers, action)
			})
		case 'TRIVIA/RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default trivia