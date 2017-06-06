import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentAppByState } from 'selectors/apps'

const filterTextSelector = state => state.filterText

const getAllQuestions = state => _.filter(_.values(state.trivia.questions), q => q.status != 'deleted')

export const getQuestionsForCurrentApp = createSelector(
	getAllQuestions,
	getCurrentAppByState,
	filterTextSelector,
	(questions, app, text) => {
		const subList = _.filter(questions, q => q.applicationId == app.id)
		return subList.filter(q => {
			return q.text ? stringContains(q.text, text) : true
		})
	}
)

export const hasQuestions = createSelector(
	getQuestionsForCurrentApp,
	questions => questions.length > 0
)