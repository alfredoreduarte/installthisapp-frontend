import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllEntries = state => _.values(state.memoryMatch.entities.entries)

export const getFilteredEntries = createSelector(
	getAllEntries,
	getCurrentAppByState,
	(entries, app) => {
		// return _.filter(entries, entry => {
		const unorderedEntries = _.filter(entries, entry => {
			return entry.status != 'deleted' && entry.applicationId == app.id
		})
		return _.orderBy(unorderedEntries, 'time', 'asc')
	}
)