import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllAnswers = state => _.filter(_.values(state.trivia.answers), a => a.status != 'deleted')

export const getAnswersForCurrentApp = createSelector(
	getAllAnswers,
	getCurrentApp,
	(answers, app) => _.filter(answers, a => a.applicationId == app.id)
)