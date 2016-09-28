import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllEntries = state => state.topFans.entries

export const getEntriesForPage = createSelector(
	getAllEntries,
	getCurrentApp,
	(entries, app) => {
		if (app) {
			if (entries[app.fbPage.identifier]){
				const selectedEntries = entries[app.fbPage.identifier]
				return _.merge(selectedEntries.likes, selectedEntries.comments)
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