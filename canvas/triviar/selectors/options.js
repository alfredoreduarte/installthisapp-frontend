import _ from 'lodash'
import { createSelector } from 'reselect'

const allQuestions = state => state.entities.questions

export const getUnansweredQuestion = createSelector(
	allQuestions,
	questions => {
		return _.find(questions, {'answered': false})
	}
)