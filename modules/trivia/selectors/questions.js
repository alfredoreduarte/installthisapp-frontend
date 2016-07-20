import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppChecksum } from 'selectors/apps'

const getAllQuestions = state => _.filter(_.values(state.trivia.questions), q => q.status != 'deleted')

export const getQuestionsForCurrentApp = createSelector(
	getAllQuestions,
	getCurrentAppChecksum,
	(questions, checksum) => _.filter(questions, q => q.appChecksum == checksum)
)