import _ from 'lodash'
import questions from 'modules/trivia/reducers/questions'
import answers from 'modules/trivia/reducers/answers'

const defaultState = {
	log: {},
	questions: {},
	answers: {},
	options: {},
}

const trivia = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'TRIVIA/DELETE_QUESTION':
			return Object.assign({}, state, {
				questions: questions(state.questions, action)
			})
		case 'TRIVIA/DELETE_ANSWER':
			return Object.assign({}, state, {
				answers: answers(state.answers, action)
			})
		case 'TRIVIA/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default trivia