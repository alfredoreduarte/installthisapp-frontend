import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentApp } from 'selectors/apps'

const filterTextSelector = state => state.filterText

const getAllPhotos = state => _.filter(_.values(state.photoContest.photos), p => p.status != 'deleted')
export const getPhotoById = (state, id) => _.find(_.values(state.photoContest.photos), p => p.id == id)

export const getPhotosForCurrentApp = createSelector(
	getAllPhotos,
	getCurrentApp,
	filterTextSelector,
	(photos, app, text) => {
		const subList = _.filter(photos, p => p.applicationId == app.id)
		return subList.filter(p => stringContains(p.caption, text))
	}
)

export const getRandomWinner = createSelector(
	getPhotosForCurrentApp,
	photos => {
		return _.sample(photos)
	}
)