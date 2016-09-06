import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentApp } from 'selectors/apps'
import { getPhotoById } from 'modules/photo_contest/selectors/photos'

const getAllVotes = state => _.filter(_.values(state.photoContest.votes), v => v.status != 'deleted')

export const getVotesForPhoto = createSelector(
	getAllVotes,
	getPhotoById,
	(votes, photo) => {
		return _.filter(votes, vote => photo.votes.indexOf(vote.id) >= 0)
	}
)