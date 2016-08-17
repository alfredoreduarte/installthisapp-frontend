import _ from 'lodash'
import { createSelector } from 'reselect'

export const allQuestions = state => _.values(state.entities.questions)
export const allOptions = state => _.values(state.entities.options)
export const answeredQuestions = state => state.answeredQuestions

const getUnansweredQuestion = createSelector(
	allQuestions,
	answeredQuestions,
	(questions, answeredArray) => {
		return _.find(questions, q => {
			return answeredArray.indexOf(q.id) < 0
		})
	}
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
	answeredQuestions,
	allQuestions,
	(answersArray, questions) => Object.keys(questions).length == answersArray.length
)