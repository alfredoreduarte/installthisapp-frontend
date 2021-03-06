import _ from 'lodash'
import { createSelector } from 'reselect'

export const allQuestions = state => _.values(state.entities.questions)
export const allOptions = state => _.values(state.entities.options)

const getUnansweredQuestion = createSelector(
	allQuestions,
	questions => _.find(questions, {'answered': false})
)

export const getQuestionWithOptions = createSelector(
	getUnansweredQuestion,
	allOptions,
	(question, options) => {
		if (question) {
			const optionsQueInteresan = _.filter(options, option => {
				return question.options.indexOf(option.id) > -1
			})
			return Object.assign({}, question, {
				options: optionsQueInteresan
			})
		}
		else{
			return null
		}
	}
)

export const hasAnsweredAllQuestions = createSelector(
	getUnansweredQuestion,
	question => question ? false : true
)