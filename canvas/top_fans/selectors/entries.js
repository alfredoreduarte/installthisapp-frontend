import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'

const handleScore = score => score ? score : 0

export const getEntries = state => {
	if (state.entries.likes || state.entries.comments) {
		const likeMultiplier = state.settings.pointsPerLike
		const commentMultiplier = state.settings.pointsPerComment
		// 
		const arrResult = merge(state.entries.likes, state.entries.comments, 'senderId')
		const arrWithScores = arrResult.map(result => {
			return {
				...result,
				likes: handleScore(result.likes),
				comments: handleScore(result.comments),
				score: handleScore(result.likes) * likeMultiplier + handleScore(result.comments) * commentMultiplier,
			}
		})
		const arrResultOrdered = _.orderBy(arrWithScores, 'score', 'desc')
		// return _.take(arrResult, 10)
		return _.take(arrResultOrdered, 10)
	}
	else{
		return []
	}
}