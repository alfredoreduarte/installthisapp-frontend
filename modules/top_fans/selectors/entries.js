import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'
import { getAllPages } from 'selectors/pages'

const getAllEntries = state => state.topFans.entries

export const getEntriesForPage = createSelector(
	getAllEntries,
	getCurrentApp,
	getAllPages,
	(entries, app, allPages) => {
		if (app) {
			const page = _.find(allPages, {'id': app.page})
			const identifier = parseInt(page.identifier)
			console.log('elpage')
			console.log(page)
			console.log(entries)
			// if (entries[app.fbPage.identifier]){
			// if (entries[app.setting.subscriptedFbPageIdentifier]){
			if (entries[identifier]){
				// const selectedEntries = entries[app.fbPage.identifier]
				// const selectedEntries = entries[app.setting.subscriptedFbPageIdentifier]
				const selectedEntries = entries[identifier]
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