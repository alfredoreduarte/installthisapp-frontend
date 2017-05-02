import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllMedia = state => _.values(state.catalog.entities.media)

export const getFilteredMedia = createSelector(
	getAllMedia,
	media => {
		return _.filter(media, medium => medium.id > 0)
	}
)