import _ from 'lodash'
import questions from 'modules/trivia/reducers/questions'

const trivia = (state = {
	questions: {},
	options: {}
}, action) => {
	switch (action.type) {
		case 'TRIVIA/DELETE_QUESTION':
			return Object.assign({}, state, {
				questions: questions(state.questions, action)
			})
		case 'TRIVIA/RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default trivia