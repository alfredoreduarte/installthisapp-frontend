import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllEntries = state => _.values(state.photoContest.entities.photos)

export const getFilteredEntries = createSelector(getAllEntries, entries => {
	return _.filter(entries, entry => entry.id > 0)
})

export const getRandomWinner = createSelector(getFilteredEntries, photos => {
	return _.sample(photos)
})
