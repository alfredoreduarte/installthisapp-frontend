import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'

const getAllEntries = state => state.topFans.entries

const handleScore = score => score ? score : 0

let verifiedScoresEventSent = false // this avoids sending duplicate events to segment (which costs money)
export const getEntriesForPage = createSelector(
	getAllEntries,
	getCurrentAppByState,
	getAllPages,
	(entries, app, allPages) => {
		if (app && app.page) {
			const page = _.find(allPages, {'id': app.page})
			const identifier = parseInt(page.identifier)
			const likeMultiplier = app.setting.pointsPerLike
			const commentMultiplier = app.setting.pointsPerComment
			const ignoredUserIdentifiers = app.setting.ignoredUserIdentifiers
			if (entries) {
				if (entries[identifier]){
					const allPageEntries = entries[identifier]
					// hide ignored users 
					const selectedEntries = {
						likes: _.filter(allPageEntries.likes, entry => ignoredUserIdentifiers.indexOf(parseInt(entry.senderId)) === -1),
						comments: _.filter(allPageEntries.comments, entry => ignoredUserIdentifiers.indexOf(parseInt(entry.senderId)) === -1),
					}
					const arrResult = merge(selectedEntries.likes, selectedEntries.comments, 'senderId')
					const arrWithScores = arrResult.map(result => {
						return {
							...result,
							likes: handleScore(result.likes),
							comments: handleScore(result.comments),
							score: handleScore(result.likes) * likeMultiplier + handleScore(result.comments) * commentMultiplier,
						}
					})
					const arrResultOrdered = _.orderBy(arrWithScores, 'score', 'desc')
					if (!verifiedScoresEventSent) {
						// TODO: Reubicar esto porque acá se dispara innecesariamente.
						// Traer los puntajes no significa que la app se haya acabado de instalar
						analytics.track('Scores Verified')
						analytics.track('App Installed', {
							appType: 'top_fans',
						})
						verifiedScoresEventSent = !verifiedScoresEventSent
					}
					return _.take(arrResultOrdered, 100)
				}
				else{
					return []
				}
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