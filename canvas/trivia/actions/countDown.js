import { 
	hasAnsweredAllQuestions, 
	allQuestions, 
	allOptions,
} from 'canvas/trivia/selectors/questions'

export const toggleCountDown = () => ({
	type: 'TOGGLE_COUNTDOWN'
})

export const advanceCountDown = () => {
	return (dispatch, getState) => {
		const { timeOut } = getState().game
		if ( timeOut == 1 ) {
			if ( hasAnsweredAllQuestions(getState()) ) {
				dispatch(prePostAnswers())
			}
			else {
				dispatch(handleUnansweredQuestions())
				dispatch(toggleCountDown())
			}
		}
		else{
			dispatch({
				type: 'COUNTDOWN_PROGRESS'
			})
		}
	}
}