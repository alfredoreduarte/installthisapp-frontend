import _ from 'lodash'
import { createSelector } from 'reselect'

const allQuestions = state => state.entities.questions
const allOptions = state => state.entities.options

export const getUnansweredQuestion = createSelector(
	allQuestions,
	questions => {
		return _.find(questions, {'answered': false})
	}
)

export const getQuestionWithOptions = createSelector(
	getUnansweredQuestion,
	allOptions,
	(question, options) => {
		// traer solo los options que figuren cuyo ID figure en question.options
		const optionsQueInteresan = _.filter(options, option => {
			return question.options.indexOf(option.id) > -1
		})
		return Object.assign({}, question, {
			options: optionsQueInteresan
		})
	}
)