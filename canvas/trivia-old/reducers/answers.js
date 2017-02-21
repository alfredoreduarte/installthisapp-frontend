const answers = (state = {
	correct: 0,
	incorrect: 0,
	details: [],
}, action) => {
	switch (action.type) {
		case 'SAVE_ANSWER':
			const { questionId, optionId, correct } = action.payload
			const correctResult = correct ? state.correct + 1 : state.correct
			const incorrectResult = correct ? state.incorrect : state.incorrect + 1
			const correctInteger = correct ? 1 : 0
			let detailsResult = state.details
			detailsResult.push({
				question: questionId,
				option: optionId,
				correct: correctInteger,
			})
			return {
				correct: correctResult,
				incorrect: incorrectResult,
				details: detailsResult,
			}
		default:
			return state
	}
}

export default answers