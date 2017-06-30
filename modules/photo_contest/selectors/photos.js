import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentAppByState } from 'selectors/apps'

const filterTextSelector = state => state.filterText

const getAllPhotos = state => _.filter(_.values(state.photoContest.photos), p => p.status != 'deleted')
export const getPhotoById = (state, id) => _.find(_.values(state.photoContest.photos), p => p.id == id)

export const getPhotosForCurrentApp = createSelector(
	getAllPhotos,
	getCurrentAppByState,
	filterTextSelector,
	(photos, app, text) => {
		const subList = _.filter(photos, p => p.applicationId == app.id)
		const filtered = subList.filter(p => stringContains(p.caption, text))
		return _.orderBy(filtered, p => p.votes.length, 'desc')
	}
)

export const getRandomWinner = createSelector(
	getPhotosForCurrentApp,
	photos => {
		return _.sample(photos)
	}
)