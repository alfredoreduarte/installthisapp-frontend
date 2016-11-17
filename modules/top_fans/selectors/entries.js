import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'

const getAllEntries = state => state.topFans.entries

const handleScore = score => score ? score : 0

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
			if (entries[identifier]){
				const selectedEntries = entries[identifier]
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
				analytics.track('Scores Verified')
				return arrResultOrdered
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