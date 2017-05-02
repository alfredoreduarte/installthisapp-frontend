import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllMedia = state => _.values(state.catalog.entities.media)

export const getFilteredMedia = createSelector(
	getAllMedia,
	getCurrentAppByState,
	(media, app) => {
		return _.filter(media, medium => {
			return medium.status != 'deleted' && medium.applicationId == app.id
		})
	}
)