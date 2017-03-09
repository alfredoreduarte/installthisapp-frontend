import _ from 'lodash'
import { createSelector } from 'reselect'
import { allowedMultipleVotes } from 'canvas/photo_contest/selectors/settings'

export const loggedUser = state => state.loggedUser
export const allVotesSelector = state => _.values(state.entities.votes)

export const votesByUserId = createSelector(
	allVotesSelector,
	loggedUser,
	(allVotes, user) => {
		return _.filter(allVotes, vote => vote.user.id == user.id)
	}
)

export const canVote = createSelector(
	votesByUserId,
	allowedMultipleVotes,
	(ownVotes, canVoteMany) => {
		// console.log('ownVotes')
		// console.log(ownVotes)
		// console.log('canVoteMany')
		// console.log(canVoteMany)
		const toReturn = ownVotes.length == 0 || canVoteMany === true
		// console.log('canvote?', toReturn)
		return toReturn
	}
)