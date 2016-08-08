const answeredQuestions = (state = [], action) => {
	switch (action.type) {
		case 'ANSWER_QUESTION':
			const newAnswer = state
			newAnswer.push(action.id)
			return newAnswer
		default:
			return state
	}
}

export default answeredQuestions