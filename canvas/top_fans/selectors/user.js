import { createSelector } from 'reselect'

export const getScoreForUser = state => {
	return state.settings.pointsPerLike * state.currentUserData.likes + state.settings.pointsPerComment * state.currentUserData.comments
}