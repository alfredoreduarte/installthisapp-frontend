import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppChecksum } from 'selectors/apps'

const getAllAnswers = state => state.answers

export const getQuestionsForCurrentApp = createSelector(
	getAllQuestions,
	getCurrentAppChecksum,
	(answers, checksum) => _.filter(answers, a => q.appChecksum == checksum)
)