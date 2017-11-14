import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllEntries = state => _.values(state.promoCode.entities.entries)

export const getFilteredEntries = createSelector(getAllEntries, entries => {
	console.log('entries')
	console.log(entries)
	return _.filter(entries, entry => entry.id > 0)
})
