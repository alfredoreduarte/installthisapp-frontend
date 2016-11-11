import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'

export const getEntries = state => {
	if (state.entries.likes || state.entries.comments) {
		const arrResult = merge(state.entries.likes, state.entries.comments, 'senderId')
		console.log('arrResult', arrResult)
		return _.take(arrResult, 10)
	}
	else{
		return []
	}
}