import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllEntries = state => _.values(state.captureTheFlag.entities.entries)

export const getFilteredEntries = createSelector(getAllEntries, entries => {
	return _.orderBy(entries, ['hasFlag', 'elapsedSeconds'], ['desc', 'desc'])
})
