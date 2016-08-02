import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllQuestions = state => _.filter(_.values(state.trivia.questions), q => q.status != 'deleted')

export const getQuestionsForCurrentApp = createSelector(
	getAllQuestions,
	getCurrentApp,
	(questions, app) => _.filter(questions, q => q.applicationId == app.id)
)