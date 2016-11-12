import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'
import { getCurrentApp } from 'selectors/apps'
import { getAllPages } from 'selectors/pages'

const getAllEntries = state => state.topFans.entries

export const getEntriesForPage = createSelector(
	getAllEntries,
	getCurrentApp,
	getAllPages,
	(entries, app, allPages) => {
		if (app && app.page) {
			const page = _.find(allPages, {'id': app.page})
			const identifier = parseInt(page.identifier)
			if (entries[identifier]){
				const selectedEntries = entries[identifier]
				const arrResult = merge(selectedEntries.likes, selectedEntries.comments, 'senderId')
				const arrResultOrdered = _.orderBy(arrResult, ['likes', 'comments'], 'desc')
				analytics.track('Scores Verified')
				return arrResult
			}
			else{
				return []
			}
		}
		else{
			return []
		}
	}
)