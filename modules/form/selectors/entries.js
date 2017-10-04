import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllEntries = state => _.values(state.formModule.entities.entries)

export const getFilteredEntries = createSelector(
	getAllEntries,
	entries => entries
)