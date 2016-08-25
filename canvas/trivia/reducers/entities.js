import _ from 'lodash'
import questions from 'canvas/trivia/reducers/questions'

const entities = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		case 'ANSWER_QUESTION':
			return Object.assign({}, state, {
				questions: questions(state.questions, action)
			})
		default:
			return state
	}
}

export default entities